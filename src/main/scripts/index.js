// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

let myRings = data.scores;
let mySegments = data.categories;
let input = {
  svg_id: "radar",
  colors: {
    background: "#232",
    grid: "#3C3"
  },
  height: 800,
  width: 1200,
  show_labels: true,
  rings: myRings,
  segments: mySegments,
  entries: data.assessments
};

draw_radar(input);
