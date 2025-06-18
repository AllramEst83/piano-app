// js/effectsDefaults.js

/**
 * A centralized object containing all default values for the synthesizer's effects and parameters.
 * This is used to initialize the state and to handle the "Reset All" functionality.
 */
export const DEFAULT_EFFECTS_STATE = {
  synthVolume: 0,
  masterVolume: -8,
  amplifier: {
    gain: 1,
    displayGain: 0,
  },
  bpm: 120,
  oscillator: "sine2",
  detune: 0,
  portamento: 0,

  envelope: {
    attack: 0.005,
    decay: 0.4,
    sustain: 0.2,
    release: 1.2,
  },

  reverb: {
    wet: 0.4,
    decay: 2.5,
    preDelay: 0.02,
  },
  chorus: {
    wet: 0.0,
    delayTime: 3.5,
    frequency: 1.5,
    depth: 0.5,
    spread: 180,
  },
  distortion: {
    amount: 0.0,
    wet: 0.0,
    oversample: "none",
  },
  delay: {
    time: 0.0,
    feedback: 0.0,
    wet: 0.0,
  },
  pitchShift: {
    pitch: 0.0,
    wet: 0.0,
  },
  filters: {
    lowpass: { frequency: 8000, Q: 0.7, rolloff: -24 },
    highpass: { frequency: 40, Q: 0.1, rolloff: -12 },
    bandpass: { frequency: 400, Q: 0.5, rolloff: -12 },
    notch: { frequency: 1000, Q: 0.1, rolloff: -12 },
  },
};
