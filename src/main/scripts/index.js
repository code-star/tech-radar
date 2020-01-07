// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

let myRings = data.scores;
let mySegments = data.categories;
function catName(cat){
  for(let i = 0; i < mySegments.length; i++){
    if(mySegments[i]["id"] == cat)
      return mySegments[i]["name"];
  }
  return `Unknown cat (${cat})`;
}

const myTechs = data.technologies;
function techName(tech) {
  for(let i = 0; i < myTechs.length; i++){
    if (myTechs[i]["id"] == tech){
      return myTechs[i]["name"];
    }
  }
  return `Unknown tech (${tech})`;
}

let myEntries = data.assessments
    .map( entry => {
      return {
        category: entry.category,
        label: `Category ${catName(entry.category)}\n${techName(entry.tech)}`,
        score: entry.score
      }
    });

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
  entries: myEntries
};

draw_radar(input);
