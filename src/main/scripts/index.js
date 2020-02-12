// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

let myRings = data.scores;
function scoreName(score){
  let ret_val = myRings.find(r => r.id == score);
  if (ret_val === undefined){
    return `Unknown score (${score})`;
  }
  return ret_val.name;
}

let mySegments = data.categories
    .map(c => {
      c.active = true;
      return c;
    });
function catName(cat){
  let ret_val = mySegments.find(s => s.id == cat);
  if (ret_val === undefined){
    return `Unknown cat (${cat})`;
  }
  return ret_val.name;
}

const myTechs = data.technologies;
function techName(tech) {
  let ret_val = myTechs.find(t => t.id == tech);
  if (ret_val === undefined){
    return `Unknown tech (${tech})`;
  }
  return ret_val.name;
}

let myEntries = data.assessments
    .map( entry => {
      let label = `${techName(entry.tech)}`;
      label += `\nAssessed as ${scoreName(entry.score)}\nin category ${catName(entry.category)}`;

      return {
        category: entry.category,
        label: label,
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
