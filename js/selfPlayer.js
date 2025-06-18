// js/selfPlayer.js

import { bpmSlider, bpmDisplay } from "./ui.js";

// --- MODULE STATE ---
// These variables are intentionally left empty.
// They will be populated by initSelfPlayer AFTER the user has clicked the power button.
let songPlaying = false;
let synth;
let songSnippetsData;
let noteDurationsData;
let selfPlayBtn;
let songSelect;

function playSongSnippet(songKey) {
  // Guard clause: if the module hasn't been initialized, do nothing.
  if (!synth) return;

  const songData = songSnippetsData[songKey];
  if (!songData) return;

  // Stop any previous song before starting a new one.
  stopSongPlayback();
  songPlaying = true;
  selfPlayBtn.textContent = "Stop self play";

  const { sequence, bpm = 120 } = songData;
  Tone.Transport.bpm.value = bpm;
  bpmSlider.value = bpm;
  bpmDisplay.textContent = bpm;
  let time = 0;

  sequence.forEach((noteObj) => {
    const duration = noteDurationsData[noteObj.type] || "4n";
    const noteTime = Tone.Time(duration).toSeconds();
    const pauseBefore = Tone.Time(noteObj.pauseBefore || 0).toSeconds();

    time += pauseBefore;

    // Schedule the note and the visual feedback
    Tone.Transport.scheduleOnce((t) => {
      synth.triggerAttackRelease(noteObj.note, duration, t);
      const keyEl = document.querySelector(`.key[data-note="${noteObj.note}"]`);
      if (keyEl) {
        keyEl.classList.add("active");
        setTimeout(() => keyEl.classList.remove("active"), noteTime * 1000);
      }
    }, time);

    time += noteTime + Tone.Time(noteObj.pauseAfter || 0).toSeconds();
  });

  // Schedule the final stop
  Tone.Transport.scheduleOnce(() => {
    stopSongPlayback();
  }, time);

  Tone.Transport.start("+0.1");
}

export function stopSongPlayback() {
  // Guard clause: Only interact with Transport if Tone.js has been started.
  // A simple check is to see if the synth has been initialized.
  if (!synth) return;

  // Check the transport state to avoid errors if it's already stopped.
  if (Tone.Transport.state !== "stopped") {
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }

  songPlaying = false;
  if (selfPlayBtn) {
    selfPlayBtn.textContent = "Start self play";
  }

  // Clear any active visual key states from self-play
  document.querySelectorAll(".key.active").forEach((key) => {
    const note = key.dataset.note;
    const voice = synth.get(note);
    const isPlaying = voice?.source?.state === "started";

    if (!isPlaying) {
      key.classList.remove("active");
    }
  });
}

/**
 * Initializes the self-player module. This should only be called AFTER Tone.start().
 * @param {Tone.PolySynth} synthNode - The initialized synth.
 * @param {object} songs - The song data object.
 * @param {object} durations - The note duration mappings.
 * @param {HTMLElement} playButton - The self-play button element.
 * @param {HTMLElement} songSelectorEl - The song select dropdown element.
 */
export function initSelfPlayer(
  synthNode,
  songs,
  durations,
  playButton,
  songSelectorEl
) {
  // Populate module variables with the initialized context
  synth = synthNode;
  songSnippetsData = songs;
  noteDurationsData = durations;
  selfPlayBtn = playButton;
  songSelect = songSelectorEl;

  const selfPlayClickHandler = () => {
    if (songPlaying) {
      stopSongPlayback();
    } else {
      playSongSnippet(songSelect.value);
    }
  };

  // Clean up any old listeners before adding a new one
  if (selfPlayBtn._clickHandler) {
    selfPlayBtn.removeEventListener("click", selfPlayBtn._clickHandler);
  }
  selfPlayBtn.addEventListener("click", selfPlayClickHandler);
  selfPlayBtn._clickHandler = selfPlayClickHandler; // Store for future removal
}

// CRITICAL: Ensure there is NO other code here that calls Tone.js functions.
