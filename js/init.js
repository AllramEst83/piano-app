export function initToneJS() {
  const reverb = new Tone.Reverb({
    decay: 1.5,
    preDelay: 0.01,
    wet: 0.3,
  }).toDestination();

  // Create a chorus effect for the classic organ sound
  const chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7,
    wet: 0.5,
  }).connect(reverb);

  // Create a distortion for some grit
  const distortion = new Tone.Distortion({
    distortion: 0.3,
    wet: 0.2,
  }).connect(chorus);

  // Create the organ synth
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine4", // Combines multiple sine waves for organ harmonics
    },
    envelope: {
      attack: 0.02,
      decay: 0.2,
      sustain: 0.8,
      release: 0.1,
    },
    volume: -8,
  }).connect(distortion);

  return {
    synth,
  };
}
