// js/ui.js
import { DEFAULT_EFFECTS_STATE } from "./effectsDefaults.js";
import { resetAmpColoring, setSliderTrackColor } from "./helpers.js";

// --- DOM Elements & Constants ---
const mobileBlocker = document.getElementById("mobile-blocker");
const loadingSpinner = document.getElementById("loading-spinner");
const infoBtn = document.getElementById("info-btn");
const infoOverlay = document.getElementById("info-overlay");
const powerBtn = document.getElementById("power-btn");

// Sidebar displays
const volumeDisplay = document.getElementById("volume-value");
export const bpmDisplay = document.getElementById("bpm-value");
const detuneDisplay = document.getElementById("detune-value");
const portamentoDisplay = document.getElementById("portamento-value");
const attackDisplay = document.getElementById("attact-value");
const decayDisplay = document.getElementById("decay-value");
const sustainDisplay = document.getElementById("sustain-value");
const releaseDisplay = document.getElementById("release-value");
const pitchShiftkDisplay = document.getElementById("pitch-shift-value");
const pitchShiftWetDisplay = document.getElementById("pitch-shift-wet-value");
const reverbWetDisplay = document.getElementById("reverb-wet-value");
const reverbDecayDisplay = document.getElementById("reverb-decay-value");
const reverbPreDelayDisplay = document.getElementById("reverb-predelay-value");
const chorusWetDisplay = document.getElementById("chorus-wet-value");
const chorusFreqDisplay = document.getElementById("chorus-freq-value");
const chorusDepthDisplay = document.getElementById("chorus-depth-value");
const chorusSpreadDisplay = document.getElementById("chorus-spread-value");
const distortionAmountDisplay = document.getElementById(
  "distortion-amount-value"
);
const distortionWetDisplay = document.getElementById("distortion-wet-value");
const distortionOversampleDisplay = document.getElementById(
  "distortion-oversample-value"
);
const delayTimeDisplay = document.getElementById("delay-time-value");
const delayFeedbackDisplay = document.getElementById("delay-feedback-value");
const delayWetDisplay = document.getElementById("delay-wet-value");
const filterFreqDisplay = document.getElementById("filter-freq-value");
const filterQDisplay = document.getElementById("filter-q-value");
const amplifierGainDisplay = document.getElementById("amplifier-value");

// Controls
export let bpmSlider = document.getElementById("bpm-slider");

// All Controls
const allControls = [
  document.getElementById("song-select"),
  document.getElementById("self-play-btn"),
  document.getElementById("reverb-slider"),
  document.getElementById("chorus-slider"),
  document.getElementById("pitch-slider"),
  document.getElementById("volume-slider"),
  document.getElementById("master-volume-slider"),
  bpmSlider,
  document.getElementById("osc-type-select"),
  document.getElementById("detune-slider"),
  document.getElementById("portamento-slider"),
  document.getElementById("reset-btn"),
  document.getElementById("attack-slider"),
  document.getElementById("decay-slider"),
  document.getElementById("sustain-slider"),
  document.getElementById("release-slider"),
  document.getElementById("reverb-wet-slider"),
  document.getElementById("reverb-decay-slider"),
  document.getElementById("reverb-predelay-slider"),
  document.getElementById("chorus-wet-slider"),
  document.getElementById("chorus-freq-slider"),
  document.getElementById("chorus-depth-slider"),
  document.getElementById("chorus-spread-slider"),
  document.getElementById("distortion-amount-slider"),
  document.getElementById("distortion-wet-slider"),
  document.getElementById("distortion-oversample-select"),
  document.getElementById("filter-type-select"),
  document.getElementById("filter-freq-slider"),
  document.getElementById("filter-q-slider"),
  document.getElementById("filter-rolloff-select"),
  document.getElementById("delay-time-slider"),
  document.getElementById("delay-feedback-slider"),
  document.getElementById("delay-wet-slider"),
  document.getElementById("pitch-shift-slider"),
  document.getElementById("pitch-shift-wet-slider"),
  document.getElementById("amplifier-slider"),
];

const breakpoint = 1795;

// --- STATE MANAGEMENT FOR EFFECTS ---
// Declare the variable here, but DO NOT initialize it yet.
let filterState;

/**
 * Updates the UI slider positions for the selected filter.
 * This no longer handles delay controls.
 * @param {object} state - The state object for a specific filter type (e.g., filterState.lowpass).
 */
function updateFilterControlsFromState(state) {
  if (!state) return;

  const freqSlider = document.getElementById("filter-freq-slider");
  const qSlider = document.getElementById("filter-q-slider");
  const rolloffSelect = document.getElementById("filter-rolloff-select");

  freqSlider.value = state.frequency;
  qSlider.value = state.Q;
  rolloffSelect.value = state.rolloff;

  filterFreqDisplay.textContent = state.frequency;
  filterQDisplay.textContent = state.Q;
}

/**
 * A helper function to make the filter controls more intuitive by updating their labels.
 * @param {string} filterType - The currently selected filter type (e.g., 'lowpass').
 */
function updateFilterLabels(filterType) {
  const filterFreqLabel = document.querySelector(
    'label[for="filter-freq-slider"]'
  );
  const filterQLabel = document.querySelector('label[for="filter-q-slider"]');

  const rolloffLabel = document.querySelector(
    'label[for="filter-rolloff-select"]'
  );

  if (!filterFreqLabel || !filterQLabel) return;

  switch (filterType) {
    case "lowpass":
    case "highpass":
      filterFreqLabel.textContent = "Cutoff Freq (Hz):";
      break;
    case "bandpass":
    case "notch":
      filterFreqLabel.textContent = "Center Freq (Hz):";
      break;
    default:
      filterFreqLabel.textContent = "Filter Freq (Hz):";
  }
  filterQLabel.textContent = "Resonance (Q):";
  rolloffLabel.textContent = "Filter Roll-off (dB/oct):";
}

/**
 * Sets all UI slider and select values back to their defaults.
 */
function updateAllControlsToDefaults() {
  document.getElementById("master-volume-slider").value =
    DEFAULT_EFFECTS_STATE.masterVolume;
  bpmSlider.value = DEFAULT_EFFECTS_STATE.bpm;
  document.getElementById("osc-type-select").value =
    DEFAULT_EFFECTS_STATE.oscillator;
  document.getElementById("detune-slider").value = DEFAULT_EFFECTS_STATE.detune;
  document.getElementById("portamento-slider").value =
    DEFAULT_EFFECTS_STATE.portamento;
  document.getElementById("attack-slider").value =
    DEFAULT_EFFECTS_STATE.envelope.attack;
  document.getElementById("decay-slider").value =
    DEFAULT_EFFECTS_STATE.envelope.decay;
  document.getElementById("sustain-slider").value =
    DEFAULT_EFFECTS_STATE.envelope.sustain;
  document.getElementById("release-slider").value =
    DEFAULT_EFFECTS_STATE.envelope.release;
  document.getElementById("pitch-shift-slider").value =
    DEFAULT_EFFECTS_STATE.pitchShift.pitch;
  document.getElementById("pitch-shift-wet-slider").value =
    DEFAULT_EFFECTS_STATE.pitchShift.wet;
  document.getElementById("reverb-wet-slider").value =
    DEFAULT_EFFECTS_STATE.reverb.wet;
  document.getElementById("reverb-decay-slider").value =
    DEFAULT_EFFECTS_STATE.reverb.decay;
  document.getElementById("reverb-predelay-slider").value =
    DEFAULT_EFFECTS_STATE.reverb.preDelay;
  document.getElementById("chorus-wet-slider").value =
    DEFAULT_EFFECTS_STATE.chorus.wet;
  document.getElementById("chorus-freq-slider").value =
    DEFAULT_EFFECTS_STATE.chorus.frequency;
  document.getElementById("chorus-depth-slider").value =
    DEFAULT_EFFECTS_STATE.chorus.depth;
  document.getElementById("chorus-spread-slider").value =
    DEFAULT_EFFECTS_STATE.chorus.spread;
  document.getElementById("distortion-amount-slider").value =
    DEFAULT_EFFECTS_STATE.distortion.amount;
  document.getElementById("distortion-wet-slider").value =
    DEFAULT_EFFECTS_STATE.distortion.wet;
  document.getElementById("distortion-oversample-select").value =
    DEFAULT_EFFECTS_STATE.distortion.oversample;
  document.getElementById("delay-time-slider").value =
    DEFAULT_EFFECTS_STATE.delay.time;
  document.getElementById("delay-feedback-slider").value =
    DEFAULT_EFFECTS_STATE.delay.feedback;
  document.getElementById("delay-wet-slider").value =
    DEFAULT_EFFECTS_STATE.delay.wet;
  let ampSlider = document.getElementById("amplifier-slider");
  ampSlider.value = DEFAULT_EFFECTS_STATE.amplifier.displayGain;
  resetAmpColoring(ampSlider);

  volumeDisplay.textContent = DEFAULT_EFFECTS_STATE.masterVolume;
  bpmDisplay.textContent = DEFAULT_EFFECTS_STATE.bpm;
  detuneDisplay.textContent = DEFAULT_EFFECTS_STATE.detune;
  portamentoDisplay.textContent = DEFAULT_EFFECTS_STATE.portamento;
  attackDisplay.textContent = DEFAULT_EFFECTS_STATE.envelope.attack;
  decayDisplay.textContent = DEFAULT_EFFECTS_STATE.envelope.decay;
  sustainDisplay.textContent = DEFAULT_EFFECTS_STATE.envelope.sustain;
  releaseDisplay.textContent = DEFAULT_EFFECTS_STATE.envelope.release;
  pitchShiftkDisplay.textContent = DEFAULT_EFFECTS_STATE.pitchShift.pitch;
  pitchShiftWetDisplay.textContent = DEFAULT_EFFECTS_STATE.pitchShift.wet;
  reverbWetDisplay.textContent = DEFAULT_EFFECTS_STATE.reverb.wet;
  reverbDecayDisplay.textContent = DEFAULT_EFFECTS_STATE.reverb.decay;
  reverbPreDelayDisplay.textContent = DEFAULT_EFFECTS_STATE.reverb.preDelay;
  chorusWetDisplay.textContent = DEFAULT_EFFECTS_STATE.chorus.wet;
  chorusFreqDisplay.textContent = DEFAULT_EFFECTS_STATE.chorus.frequency;
  chorusDepthDisplay.textContent = DEFAULT_EFFECTS_STATE.chorus.depth;
  chorusSpreadDisplay.textContent = DEFAULT_EFFECTS_STATE.chorus.spread;
  distortionAmountDisplay.textContent = DEFAULT_EFFECTS_STATE.distortion.amount;
  distortionWetDisplay.textContent = DEFAULT_EFFECTS_STATE.distortion.wet;
  delayTimeDisplay.textContent = DEFAULT_EFFECTS_STATE.delay.time;
  delayFeedbackDisplay.textContent = DEFAULT_EFFECTS_STATE.delay.feedback;
  delayWetDisplay.textContent = DEFAULT_EFFECTS_STATE.delay.wet;
  amplifierGainDisplay.textContent =
    DEFAULT_EFFECTS_STATE.amplifier.displayGain;

  // Filter (based on the currently active filter type)
  resetAllFilterControlsToDefault();
}

function resetAllFilterControlsToDefault() {
  const defaultType = "lowpass";
  document.getElementById("filter-type-select").value = defaultType;

  const defaultFilterState = structuredClone(
    DEFAULT_EFFECTS_STATE.filters[defaultType]
  );
  updateFilterControlsFromState(defaultFilterState);
  updateFilterLabels(defaultType);

  filterFreqDisplay.textContent = defaultFilterState.frequency;
  filterQDisplay.textContent = defaultFilterState.Q;
}

/**
 * Resets all Tone.js audio nodes to their default values.
 * @param {object} audioContext - The full audio context from audio.js
 * @param {object} filterMap - The map of string names to filter objects.
 */
function resetAudioToDefaults(audioContext, filterMap) {
  const {
    synth,
    pitchShift,
    reverb,
    chorus,
    distortion,
    delay,
    amplifierGain,
    masterVolume,
  } = audioContext;

  synth.volume.value = DEFAULT_EFFECTS_STATE.synthVolume;
  masterVolume.volume.value = DEFAULT_EFFECTS_STATE.masterVolume;
  Tone.Transport.bpm.value = DEFAULT_EFFECTS_STATE.bpm;

  synth.set({
    oscillator: { type: DEFAULT_EFFECTS_STATE.oscillator },
    detune: DEFAULT_EFFECTS_STATE.detune,
    portamento: DEFAULT_EFFECTS_STATE.portamento,
    envelope: { ...DEFAULT_EFFECTS_STATE.envelope },
  });

  pitchShift.set({ ...DEFAULT_EFFECTS_STATE.pitchShift });
  reverb.set({ ...DEFAULT_EFFECTS_STATE.reverb });
  chorus.set({ ...DEFAULT_EFFECTS_STATE.chorus, delayTime: 3.5 }); // delayTime is not settable on the fly, but we reset others
  distortion.set({ ...DEFAULT_EFFECTS_STATE.distortion });
  delay.set({ ...DEFAULT_EFFECTS_STATE.delay });
  amplifierGain.gain.value = DEFAULT_EFFECTS_STATE.amplifier.gain;

  for (const type in filterMap) {
    const filterNode = filterMap[type];
    const defaultState = filterState[type];
    filterNode.set({ ...defaultState });
  }
}

/**
 * Enables all interactive controls when the power is turned on.
 * @param {object} audioContext - The object containing all Tone.js nodes.
 */
export function enableControls(audioContext) {
  allControls.forEach((el) => {
    if (el) {
      el.disabled = false;
      el.classList.remove("opacity-40", "cursor-not-allowed");
      el.closest(
        ".slider-control, .select-control, .emphasized-control, label, button"
      )?.classList.remove("opacity-40");
    }
  });

  initFxSliders(audioContext);
}

/**
 * Disables all interactive controls when the power is turned off.
 */
export function disableControls() {
  allControls.forEach((el) => {
    if (el) {
      el.disabled = true;
      el.classList.add("opacity-40", "cursor-not-allowed");
      el.closest(
        ".slider-control, .select-control, .emphasized-control, label, button"
      )?.classList.add("opacity-40");
    }
  });
}

export function updatePowerButton(isPowerOn) {
  powerBtn.classList.toggle("glow-on", isPowerOn);
  powerBtn.classList.toggle("glow-off", !isPowerOn);
  powerBtn.textContent = "●";
}

/**
 * Initializes all event listeners for the sidebar controls to update the audio nodes.
 * @param {object} audioContext - The object containing all Tone.js nodes.
 */
function initFxSliders(audioContext) {
  const {
    synth,
    pitchShift,
    reverb,
    chorus,
    distortion,
    lowpassFilter,
    highpassFilter,
    bandpassFilter,
    notchFilter,
    delay,
    amplifierGain,
  } = audioContext;

  // *** FIX: Initialize filterState here, AFTER the module has loaded. ***
  filterState = structuredClone(DEFAULT_EFFECTS_STATE.filters);

  const filterMap = {
    lowpass: lowpassFilter,
    highpass: highpassFilter,
    bandpass: bandpassFilter,
    notch: notchFilter,
  };
  const filterTypeSelect = document.getElementById("filter-type-select");
  let activeFilter = filterMap[filterTypeSelect.value];

  // --- Reset Button Listener ---
  document.getElementById("reset-btn").addEventListener("click", () => {
    // 1. Reset the state variable
    filterState = structuredClone(DEFAULT_EFFECTS_STATE.filters);
    // 2. Reset all audio node parameters to default
    resetAudioToDefaults(audioContext, filterMap);
    // 3. Reset all UI controls to match the new state
    updateAllControlsToDefaults();
  });

  // --- Listeners for Master, ADSR, Reverb, Chorus, Distortion ---
  document
    .getElementById("master-volume-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      synth.volume.value = value;
      volumeDisplay.textContent = value;
    });

  bpmSlider.addEventListener("input", (e) => {
    const value = Number(e.target.value);
    Tone.Transport.bpm.value = value;
    bpmDisplay.textContent = value;
  });
  document
    .getElementById("osc-type-select")
    .addEventListener("change", (e) =>
      synth.set({ oscillator: { type: e.target.value } })
    );
  document.getElementById("detune-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    synth.set({ detune: value });
    detuneDisplay.textContent = value;
  });
  document
    .getElementById("portamento-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      synth.set({ portamento: value });
      portamentoDisplay.textContent = value;
    });
  document.getElementById("attack-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    synth.set({ envelope: { attack: value } });
    attackDisplay.textContent = value;
  });
  document.getElementById("decay-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    synth.set({ envelope: { decay: value } });
    decayDisplay.textContent = value;
  });
  document.getElementById("sustain-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    synth.set({ envelope: { sustain: value } });
    sustainDisplay.textContent = value;
  });
  document.getElementById("release-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    synth.set({ envelope: { release: value } });
    releaseDisplay.textContent = value;
  });
  document
    .getElementById("pitch-shift-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      pitchShift.pitch = value;
      pitchShiftkDisplay.textContent = value;
    });
  document
    .getElementById("pitch-shift-wet-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      pitchShift.wet.value = value;
      pitchShiftWetDisplay.textContent = value;
    });
  document
    .getElementById("reverb-wet-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      reverb.wet.value = value;
      reverbWetDisplay.textContent = value;
    });

  document
    .getElementById("reverb-decay-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      reverb.decay = value;
      reverbDecayDisplay.textContent = value;
    });

  document
    .getElementById("reverb-predelay-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      reverb.preDelay = value;
      reverbPreDelayDisplay.textContent = value;
    });

  document
    .getElementById("chorus-wet-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      chorus.wet.value = value;
      chorusWetDisplay.textContent = value;
    });

  document
    .getElementById("chorus-freq-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      chorus.frequency.value = value;
      chorusFreqDisplay.textContent = value;
    });

  document
    .getElementById("chorus-depth-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      chorus.depth = value;
      chorusDepthDisplay.textContent = value;
    });

  document
    .getElementById("chorus-spread-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      chorus.spread = value;
      chorusSpreadDisplay.textContent = value;
    });

  document
    .getElementById("distortion-amount-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      distortion.distortion = value;
      distortionAmountDisplay.textContent = value;
    });

  document
    .getElementById("distortion-wet-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      distortion.wet.value = value;
      distortionWetDisplay.textContent = value;
    });

  document
    .getElementById("distortion-oversample-select")
    .addEventListener(
      "change",
      (e) => (distortion.oversample = e.target.value)
    );

  document
    .getElementById("delay-time-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      delay.delayTime.value = value;
      delayTimeDisplay.textContent = value;
    });

  document
    .getElementById("delay-feedback-slider")
    .addEventListener("input", (e) => {
      const value = Number(e.target.value);
      delay.feedback.value = value;
      delayFeedbackDisplay.textContent = value;
    });

  document.getElementById("delay-wet-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    delay.wet.value = value;
    delayWetDisplay.textContent = value;
  });

  document.getElementById("amplifier-slider").addEventListener("input", (e) => {
    const value = Number(e.target.value);
    const gain = Math.pow(10, value / 20);
    amplifierGain.gain.value = gain;
    amplifierGainDisplay.textContent = value;

    // Change slider color based on dB
    setSliderTrackColor(e.target, value, e.target.max);
  });

  // --- FILTER CONTROLS (stateful per type) ---
  const initialFilterType = filterTypeSelect.value;
  updateFilterLabels(initialFilterType);
  updateFilterControlsFromState(filterState[initialFilterType]);

  filterTypeSelect.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    activeFilter = filterMap[selectedType];
    updateFilterLabels(selectedType);
    updateFilterControlsFromState(filterState[selectedType]);
  });

  // -----
  document
    .getElementById("filter-freq-slider")
    .addEventListener("input", (e) => {
      const currentType = filterTypeSelect.value;
      const value = parseFloat(e.target.value);
      filterState[currentType].frequency = value;
      activeFilter.frequency.value = value;
      filterFreqDisplay.textContent = value;
    });

  document.getElementById("filter-q-slider").addEventListener("input", (e) => {
    const currentType = filterTypeSelect.value;
    const value = parseFloat(e.target.value);
    filterState[currentType].Q = value;
    activeFilter.Q.value = value;
    filterQDisplay.textContent = value;
  });

  document
    .getElementById("filter-rolloff-select")
    .addEventListener("change", (e) => {
      const currentType = filterTypeSelect.value;
      const value = parseFloat(e.target.value);
      filterState[currentType].rolloff = value;
      activeFilter.rolloff = value;
    });
}

function InitSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const collapseBtn = document.getElementById("collapse-btn");

  collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("sidebar-collapsed");
  });
}

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

function handleScreenSize(isInitialLoad = false) {
  const isMobile = window.innerWidth < breakpoint;

  if (isMobile) {
    mobileBlocker.classList.remove("opacity-0", "pointer-events-none");
    mobileBlocker.classList.add("opacity-100", "show");
  } else {
    mobileBlocker.classList.remove("opacity-100", "show");
    mobileBlocker.classList.add("opacity-0", "pointer-events-none");
    if (!isInitialLoad) {
      document.body.classList.add("ready");
    }
  }
  return isMobile;
}

export function initUI(keyboardToNoteMap) {
  const isMobile = handleScreenSize(true);
  window.addEventListener("resize", () => handleScreenSize(false));

  setTimeout(() => {
    loadingSpinner.style.transition = "opacity 500ms ease-out";
    loadingSpinner.style.opacity = "0";
    if (!isMobile) {
      document.body.classList.add("ready");
    }
    setTimeout(() => {
      loadingSpinner.style.display = "none";
    }, 500);
  }, 800);

  initInfoButton();
  InitSidebarToggle();

  if (keyboardToNoteMap) {
    for (const code in keyboardToNoteMap) {
      if (keyboardToNoteMap[code].element) {
        keyboardToNoteMap[code].element.dataset.keyboardCode = code;
      }
    }
  }
}
