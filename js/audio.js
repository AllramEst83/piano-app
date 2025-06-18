import { DEFAULT_EFFECTS_STATE } from "./effectsDefaults.js";

/**
 * Initializes and returns all Tone.js audio nodes, now with multiple filters.
 * @returns {Promise<object>} A promise that resolves to an object containing all the audio nodes.
 */
export async function initAudio() {
  // Reverb
  const reverb = new Tone.Reverb({
    decay: DEFAULT_EFFECTS_STATE.reverb.decay,
    preDelay: DEFAULT_EFFECTS_STATE.reverb.preDelay,
    wet: DEFAULT_EFFECTS_STATE.reverb.wet,
  });
  await reverb.generate();

  // Chorus
  const chorus = new Tone.Chorus({
    frequency: DEFAULT_EFFECTS_STATE.chorus.frequency,
    delayTime: DEFAULT_EFFECTS_STATE.chorus.delayTime,
    depth: DEFAULT_EFFECTS_STATE.chorus.depth,
    spread: DEFAULT_EFFECTS_STATE.chorus.spread,
    wet: DEFAULT_EFFECTS_STATE.chorus.wet,
  }).start();

  // Distortion
  const distortion = new Tone.Distortion({
    distortion: DEFAULT_EFFECTS_STATE.distortion.amount,
    oversample: DEFAULT_EFFECTS_STATE.distortion.oversample,
    wet: DEFAULT_EFFECTS_STATE.distortion.wet,
  });

  // Filters
  const lowpassFilter = new Tone.Filter({
    type: "lowpass",
    frequency: DEFAULT_EFFECTS_STATE.filters.lowpass.frequency,
    Q: DEFAULT_EFFECTS_STATE.filters.lowpass.Q,
    rolloff: DEFAULT_EFFECTS_STATE.filters.lowpass.rolloff,
  });

  const highpassFilter = new Tone.Filter({
    type: "highpass",
    frequency: DEFAULT_EFFECTS_STATE.filters.highpass.frequency,
    Q: DEFAULT_EFFECTS_STATE.filters.highpass.Q,
    rolloff: DEFAULT_EFFECTS_STATE.filters.highpass.rolloff,
  });

  const bandpassFilter = new Tone.Filter({
    type: "bandpass",
    frequency: DEFAULT_EFFECTS_STATE.filters.bandpass.frequency,
    Q: DEFAULT_EFFECTS_STATE.filters.bandpass.Q,
    rolloff: DEFAULT_EFFECTS_STATE.filters.bandpass.rolloff,
  });

  const notchFilter = new Tone.Filter({
    type: "notch",
    frequency: DEFAULT_EFFECTS_STATE.filters.notch.frequency,
    Q: DEFAULT_EFFECTS_STATE.filters.notch.Q,
    rolloff: DEFAULT_EFFECTS_STATE.filters.notch.rolloff,
  });

  // Delay
  const delay = new Tone.FeedbackDelay({
    delayTime: DEFAULT_EFFECTS_STATE.delay.time,
    feedback: DEFAULT_EFFECTS_STATE.delay.feedback,
    wet: DEFAULT_EFFECTS_STATE.delay.wet,
  });

  //PitchShift
  const pitchShift = new Tone.PitchShift({
    pitch: DEFAULT_EFFECTS_STATE.pitchShift.pitch,
    wet: DEFAULT_EFFECTS_STATE.pitchShift.wet,
  });

  // Synth
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: DEFAULT_EFFECTS_STATE.oscillator },
    envelope: { ...DEFAULT_EFFECTS_STATE.envelope },
    volume: DEFAULT_EFFECTS_STATE.synthVolume,
    portamento: DEFAULT_EFFECTS_STATE.portamento,
    detune: DEFAULT_EFFECTS_STATE.detune,
  });

  // Final boost amp
  const amplifierGain = new Tone.Gain(DEFAULT_EFFECTS_STATE.amplifier.gain);

  // Output volume control
  const masterVolume = new Tone.Volume(
    DEFAULT_EFFECTS_STATE.masterVolume
  ).toDestination();

  // Signal chain
  synth.chain(
    lowpassFilter,
    highpassFilter,
    bandpassFilter,
    notchFilter,
    distortion,
    chorus,
    reverb,
    delay,
    pitchShift,
    amplifierGain,
    masterVolume
  );

  return {
    synth,
    reverb,
    chorus,
    distortion,
    lowpassFilter,
    highpassFilter,
    bandpassFilter,
    notchFilter,
    delay,
    pitchShift,
    amplifierGain,
    masterVolume,
  };
}
