export const songSnippets = {
  twinkle: {
    name: "Twinkle Twinkle Little Star",
    bpm: 160,
    sequence: [
      // Part 1
      { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "A4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "A4", type: "quarter", pauseAfter: 0.1 },
      { note: "G4", type: "half", pauseBefore: 0, pauseAfter: 0.3 },

      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "C4", type: "half", pauseBefore: 0, pauseAfter: 0.3 },

      // Part 2
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "half", pauseBefore: 0, pauseAfter: 0.3 },

      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "half", pauseBefore: 0, pauseAfter: 0.3 },

      // Part 3 (same as Part 1)
      { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "A4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "A4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "G4", type: "half", pauseBefore: 0, pauseAfter: 0.3 },

      { note: "F4", type: "quarter", pauseAfter: 0.1 },
      { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.1 },
      { note: "D4", type: "quarter", pauseAfter: 0.1 },
      { note: "C4", type: "half", pauseBefore: 0, pauseAfter: 0.5 },
    ],
  },
};

export const noteDurations = {
  // Standard
  whole: "1n",
  half: "2n",
  quarter: "4n",
  eighth: "8n",
  sixteenth: "16n",
  thirtySecond: "32n",
  sixtyFourth: "64n",

  // Dotted
  dottedWhole: "1n.",
  dottedHalf: "2n.",
  dottedQuarter: "4n.",
  dottedEighth: "8n.",
  dottedSixteenth: "16n.",

  // Triplets
  wholeTriplet: "1t",
  halfTriplet: "2t",
  quarterTriplet: "4t",
  eighthTriplet: "8t",
  sixteenthTriplet: "16t",
  thirtySecondTriplet: "32t",

  // Custom aliases (optional)
  breve: "0.5n", // double whole note
  doubleDottedQuarter: "4n..", // rare but supported
};
