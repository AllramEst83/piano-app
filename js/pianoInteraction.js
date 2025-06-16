// js/pianoInteraction.js

const pianoKeys = document.querySelectorAll(".key");
let activeNoteHandlers = {}; // To store the handlers for removal
let pressedKeyboardKeys = new Set();

/**
 * Plays a note on the synth and updates the key's visual state.
 */
function playNote(synth, note, keyElement) {
  if (keyElement && !keyElement.classList.contains("active")) {
    synth.triggerAttack(note);
    keyElement.classList.add("active");
  }
}

/**
 * Releases a note on the synth and updates the key's visual state.
 */
function releaseNote(synth, note, keyElement) {
  if (keyElement && keyElement.classList.contains("active")) {
    synth.triggerRelease(note);
    keyElement.classList.remove("active");
  }
}

/**
 * Adds all event listeners for piano interaction.
 */
export function initPianoInteraction(synth, keyboardToNoteMap) {
  disablePianoInteraction(); // Clear any previous state/listeners first

  // Mouse Handlers
  const mouseDownHandler = (e) => {
    e.preventDefault();
    const key = e.target.closest(".key");
    if (key) playNote(synth, key.dataset.note, key);
  };
  const mouseUpHandler = (e) => {
    const key = e.target.closest(".key");
    if (key) releaseNote(synth, key.dataset.note, key);
  };
  const mouseLeaveHandler = (e) => {
    const key = e.target.closest(".key");
    if (key) releaseNote(synth, key.dataset.note, key);
  };

  pianoKeys.forEach((key) => {
    key.addEventListener("mousedown", mouseDownHandler);
    key.addEventListener("mouseup", mouseUpHandler);
    key.addEventListener("mouseleave", mouseLeaveHandler);
    // When enabling, remove the disabled styles
    key.classList.remove("pointer-events-none", "opacity-60");
  });

  // Keyboard Handlers
  const keyDownHandler = (e) => {
    if (e.repeat) return;
    if (e.code in keyboardToNoteMap) {
      e.preventDefault();
      const { note, element } = keyboardToNoteMap[e.code];
      playNote(synth, note, element);
      pressedKeyboardKeys.add(e.code);
    }
  };
  const keyUpHandler = (e) => {
    if (e.code in keyboardToNoteMap) {
      e.preventDefault();
      const { note, element } = keyboardToNoteMap[e.code];
      releaseNote(synth, note, element);
      pressedKeyboardKeys.delete(e.code);
    }
  };

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  // Store handlers so they can be removed later
  activeNoteHandlers = {
    mouseDownHandler,
    mouseUpHandler,
    mouseLeaveHandler,
    keyDownHandler,
    keyUpHandler,
  };
}

/**
 * Removes all event listeners and visually disables the piano keys.
 */
export function disablePianoInteraction() {
  // Get the piano keys right when we need them.
  const pianoKeys = document.querySelectorAll(".key");
  const {
    mouseDownHandler,
    mouseUpHandler,
    mouseLeaveHandler,
    keyDownHandler,
    keyUpHandler,
  } = activeNoteHandlers;

  pianoKeys.forEach((key) => {
    // Remove listeners to prevent memory leaks
    key.removeEventListener("mousedown", mouseDownHandler);
    key.removeEventListener("mouseup", mouseUpHandler);
    key.removeEventListener("mouseleave", mouseLeaveHandler);
    // Add the disabled styles
    key.classList.add("pointer-events-none", "opacity-60");
  });

  document.removeEventListener("keydown", keyDownHandler);
  document.removeEventListener("keyup", keyUpHandler);

  pressedKeyboardKeys.clear();
  activeNoteHandlers = {};
}
