export async function initToneJS() {
  const reverb = new Tone.Reverb({
    decay: 1.5,
    preDelay: 0.01,
    wet: 0.3,
  });

  await reverb.generate(); // 👈 Important!

  const chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.5,
    wet: 0.5,
  }).start();

  const distortion = new Tone.Distortion({
    distortion: 0.3,
    wet: 0.2,
  });

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine4",
    },
    envelope: {
      attack: 0.02,
      decay: 0.2,
      sustain: 0.8,
      release: 0.1,
    },
    volume: -8,
  });

  // Connect the full chain
  synth.connect(distortion);
  distortion.connect(chorus);
  chorus.connect(reverb);
  reverb.toDestination();

  return {
    synth,
    reverb,
    chorus,
  };
}
