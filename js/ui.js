// js/ui.js

// --- DOM Elements & Constants ---
const mobileBlocker = document.getElementById("mobile-blocker");
const loadingSpinner = document.getElementById("loading-spinner");
const infoBtn = document.getElementById("info-btn");
const infoOverlay = document.getElementById("info-overlay");
const powerBtn = document.getElementById("power-btn");
const controlPanelElements = document.querySelectorAll(
  "#control-panel button, #control-panel select, #control-panel input"
);
const breakpoint = 1280;

// --- Control Panel --- //
export function disableControls() {
  controlPanelElements.forEach((el) => {
    el.disabled = true;
    el.classList.add("opacity-40", "cursor-not-allowed");
  });
}

export function enableControls(synth, reverb, chorus) {
  controlPanelElements.forEach((el) => {
    el.disabled = false;
    el.classList.remove("opacity-40", "cursor-not-allowed");
  });
  initFxSliders(synth, reverb, chorus);
}

// --- Power Button --- //
export function updatePowerButton(isPowerOn) {
  powerBtn.classList.toggle("glow-on", isPowerOn);
  powerBtn.classList.toggle("glow-off", !isPowerOn);
  powerBtn.textContent = "●";
}

// --- FX Sliders --- //
function initFxSliders(synth, reverb, chorus) {
  document.getElementById("reverb-slider").addEventListener("input", (e) => {
    reverb.wet.value = parseFloat(e.target.value);
  });
  document.getElementById("chorus-slider").addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    chorus.depth = val;
    chorus.wet.value = val;
  });
  document.getElementById("pitch-slider").addEventListener("input", (e) => {
    synth.set({ detune: parseFloat(e.target.value) });
  });
  document.getElementById("volume-slider").addEventListener("input", (e) => {
    synth.volume.value = parseFloat(e.target.value);
  });
}

// --- Info Button Overlay --- //
function initInfoButton() {
  infoBtn.addEventListener("click", () =>
    infoOverlay.classList.toggle("hidden")
  );
  document.addEventListener("click", (e) => {
    if (!infoBtn.contains(e.target) && !infoOverlay.contains(e.target)) {
      infoOverlay.classList.add("hidden");
    }
  });
}

// --- Screen Size / Mobile Blocker (Corrected) --- //
/**
 * Handles showing or hiding the mobile blocker based on screen width.
 * This is called on initial load and on window resize.
 * @param {boolean} isInitialLoad - Flag to differentiate between first run and resize events.
 * @returns {boolean} - True if the view is mobile, false otherwise.
 */
function handleScreenSize(isInitialLoad = false) {
  const isMobile = window.innerWidth < breakpoint;

  if (isMobile) {
    mobileBlocker.classList.remove("opacity-0", "pointer-events-none");
    mobileBlocker.classList.add("opacity-100", "show");
  } else {
    mobileBlocker.classList.remove("opacity-100", "show");
    mobileBlocker.classList.add("opacity-0", "pointer-events-none");
    // On resize, if we go from mobile to desktop, make sure the body is ready
    if (!isInitialLoad) {
      document.body.classList.add("ready");
    }
  }
  return isMobile;
}

// --- Main UI Initializer --- //
/**
 * This is the primary function to set up the entire UI on page load.
 */
export function initUI(keyboardToNoteMap) {
  // 1. Perform the initial screen size check
  const isMobile = handleScreenSize(true);

  // 2. Add listener for future resize events
  window.addEventListener("resize", () => handleScreenSize(false));

  // 3. Handle the initial loading spinner and reveal the main content
  setTimeout(() => {
    loadingSpinner.style.transition = "opacity 500ms ease-out";
    loadingSpinner.style.opacity = "0";

    // **CRUCIAL**: Show the main UI, but only if we are not on a mobile screen.
    if (!isMobile) {
      document.body.classList.add("ready");
    }

    setTimeout(() => {
      loadingSpinner.style.display = "none";
    }, 500); // Wait for fade-out transition
  }, 800); // Initial delay

  // 4. Set up other static UI components
  initInfoButton();

  // Add keyboard codes to piano key elements
  for (const code in keyboardToNoteMap) {
    if (keyboardToNoteMap[code].element) {
      keyboardToNoteMap[code].element.dataset.keyboardCode = code;
    }
  }
}
