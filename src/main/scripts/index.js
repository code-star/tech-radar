// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

draw_radar({
  svg_id: "radar",
  colors: {
    background: "#777",
    grid: "#3C3"
  },
  height: 800,
  width: 1200,
  show_labels: true,
  rings: [
    { "id": 0, "name": "Adopt"},
    { "id": 1, "name": "Trial"},
    { "id": 2, "name": "Assess"},
    { "id": 3, "name": "Hold"}
  ],
  segments: [
    {"id":  "IF", "name":  "Infrastructure"},
    {"id":  "LG", "name":  "Language"},
    {"id":  "FW", "name":  "Framework"},
    {"id":  "DM", "name":  "Data Management"},
    {"id":  "FE", "name":  "Front end"}
  ],
  entries: [
    {"tech": "AA", "category":  "LG", "score": 0, "ts": "2019-12-21T10:00:00.000Z"},
    {"tech": "BB", "category":  "IF", "score": 2, "ts": "2019-12-21T10:00:00.000Z"},
    {"tech": "CC", "category":  "LG", "score": 1, "ts": "2019-12-21T10:00:00.000Z"}
  ]
});
