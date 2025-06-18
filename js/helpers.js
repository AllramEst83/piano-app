// helpers.js

export function resetAmpColoring(ampSlider) {
  const ampResetValue = 0;
  setSliderTrackColor(ampSlider, ampResetValue, ampSlider.max);
}

export function setSliderTrackColor(slider, value, max) {
  const percent = (value / max) * 100;
  let color = "#22c55e";
  if (value > 14) color = "#ef4444";
  else if (value > 6) color = "#facc15";

  slider.style.background = `linear-gradient(to right, 
    ${color} 0%, 
    ${color} ${percent}%, 
    #4b5563 ${percent}%, 
    #4b5563 100%)`;
}
