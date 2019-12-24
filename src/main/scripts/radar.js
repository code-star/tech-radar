// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

function draw_radar(config) {

  function polar(car) {
    return {
      t: Math.atan2(car.y, car.x),
      r: Math.sqrt(car.x * car.x + car.y * car.y)
    }
  }

  function cartesian(polar) {
    return {
      x: polar.r * Math.cos(polar.t),
      y: polar.r * Math.sin(polar.t)
    }
  }

  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295
  let seed = 42;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // avoid x% of each end
  let empty_zone_percentage = 0.1;
  function random_between(min, max) {
    return min * (1 + empty_zone_percentage) + random() * (1 - 2 * empty_zone_percentage) * (max - min);
  }

  function translate(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  function min(x, y) {
    return x < y ? x : y;
  }

  function segment(seg, ring) {
    return {
      randomPos: function() {
        return cartesian( {
          t: random_between(seg * segment_arc, (seg + 1) * segment_arc),
          r: random_between(ring * ring_size, (ring + 1) * ring_size)
        })
      }
    }
  }

  let segments = config.segments;
  function catIndex(cat) {
    return segments.indexOf(function(s){
      return s === cat;
    })
  }

  var svg = d3.select("svg#" + config.svg_id)
      .style("background-color", config.colors.background)
      .attr("height", config.height)
      .attr("width", config.width);

  var radar = svg.append("g");

  // position radar in middle of the svg
  radar.attr("transform", translate(config.width / 2, config.height / 2));

  var grid = radar.append("g");

  // draw segment lines
  const radius = (min(config.width, config.height) - 2) / 2;
  const segment_arc = 2 * Math.PI / config.segments.length;
  for (var i = 0; i < config.segments.length; i++) {
    var x2 = Math.sin(Math.PI - i * segment_arc) * radius;
    var y2 = Math.cos(Math.PI - i * segment_arc) * radius;
    grid.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", x2).attr("y2", y2)
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1)
  }

  // draw rings
  const ring_size = radius / config.rings.length;
  for (var i = 0; i < config.rings.length; i++) {
    grid.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", (i + 1) * ring_size)
        .style("fill", "none")
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1);
    if (config.show_labels) {
      grid.append("text")
          .text(config.rings[i].name)
          .attr("y", -(i + 1) * ring_size + 70)
          .attr("text-anchor", "middle")
          .style("fill", config.colors.grid)
          .style("font-family", "Arial, Helvetica")
          .style("font-size", 42)
          .style("font-weight", "bold")
          .style("pointer-events", "none")
          .style("user-select", "none");
    }
  }

  // create layer for entries
  var rink = radar.append("g")
      .attr("id", "rink")

  // position each entry randomly in its segment
  for(var i=0; i<config.entries.length;i++){
    var entry = config.entries[i];
    entry.segment = segment(catIndex(entry.category), entry.score);
    var point = entry.segment.randomPos();
    entry.x = point.x;
    entry.y = point.y;
    entry.color = "#e33";
  }

  // draw blips on the radar
  var blips = rink.selectAll(".blip")
      .data(config.entries)
      .enter()
      .append("g")
      .attr("class", "blip");

  // configure each blip
  blips.each(function(d){
    let blip = d3.select(this);

    // blip shape and position
    blip.append("circle")
        .attr("r", 9)
        .attr("fill", d.color)
        .attr("transform", translate(d.x, d.y));

  });
}