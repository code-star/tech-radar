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
      x: polar.r * Math.sin(polar.t),
      y: - polar.r * Math.cos(polar.t)
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
  // assumes 0 <= min < max
  const empty_zone_percentage = 0.1;
  const range_correction = 1.0 - 2 * empty_zone_percentage;
  function random_between(min, max) {
    if (max <= min || min < 0){
      console.warn(`random_between called with invalid min/max: ${min} / ${max}`)
    }
    let range = max - min;
    let boundary = empty_zone_percentage * range;
    return (min + boundary) + (random() * range_correction * range);
  }

  function translate(x, y) {
    return "translate(" + x + "," + y + ")";
  }

  function min(x, y) {
    return x < y ? x : y;
  }

  const radius = (min(config.width, config.height) - 10) / 2;
  const ring_count = config.rings.length;
  function ringBounds(ring) {
    // use sqrt between [0-1] to give inner rings more room
    let lower = ring / ring_count;
    let upper = (ring + 1) / ring_count;
    return {
      lower: Math.sqrt(lower) * radius,
      upper: Math.sqrt(upper) * radius
    };
  }

  function segment(seg, ring, segmentCount) {
    let t_min = seg * segment_arc;
    let t_max = (seg + 1) * segment_arc;
    let r_min = ringBounds(ring).lower / 2;
    let r_max = ringBounds(ring).upper / 2;
    return {
      randomPos: function() {
        return {
          t: random_between(t_min, t_max),
          r: random_between(r_min, r_max)
        }
      },
      color: function() {
        return segment_color(seg, segmentCount)
      },
      adjust: function(d) {
        let new_polar = {
          t: Math.max(t_min, Math.min(t_max, d.x)),
          r: Math.max(r_min, Math.min(r_max, d.y))};
        d.x = new_polar.t;
        d.y = new_polar.r;
        d.cx = cartesian({t: d.x, r: d.y}).x;
        d.cy = cartesian({t: d.x, r: d.y}).y;
        return new_polar
      }
    }
  }

  let segments = config.segments;
  function catIndex(cat) {
    return segments.findIndex(function(s){
      return s.id === cat;
    });
  }

  function segment_color(seg, max) {
    return `hsl(${360 * (seg / max)}, 100%, 50%)`
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
  const segment_count = config.segments.length;
  const segment_arc = 2 * Math.PI / segment_count;
  for (var i = 0; i < segment_count; i++) {
    var x2 = Math.sin(i * segment_arc) * radius;
    var y2 = - Math.cos(i * segment_arc) * radius;
    grid.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", x2).attr("y2", y2)
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1)
  }

  // draw rings
  for (var i = 0; i < config.rings.length; i++) {
    grid.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", ringBounds(i).upper)
        .style("fill", "none")
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1);
    if (config.show_labels) {
      grid.append("text")
          .text(config.rings[i].name)
          .attr("y", -ringBounds(i).lower - 10)
          .attr("text-anchor", "middle")
          .style("fill", config.colors.grid)
          .style("font-family", "Arial, Helvetica")
          .style("font-size", 48 * (Math.sqrt(1 - (i / config.rings.length))))
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
    entry.segment = segment(catIndex(entry.category), entry.score, segments.length);
    entry.point = entry.segment.randomPos();

    // polar for simulation - keep blips in correct ring and segment
    entry.x = entry.point.r;
    entry.y = entry.point.t;

    // cartesian for drawing
    entry.cx = cartesian({"r": entry.x, "t": entry.y}).x;
    entry.cy = cartesian({"r": entry.x, "t": entry.y}).y;
    entry.color = entry.segment.color();
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
        .attr("transform", translate(d.cx, d.cy));

  });

  function ticked() {
    blips.attr("transform", function(d){
      return translate(d.cx, d.cy)
    })
  }

  function restrict(alpha){
    for (var i = 0; i < config.entries.length; i++){
      let entry = config.entries[i];
      entry.segment.adjust(entry);
    }
  }

  // make sure blips do not overlap, but stay within their assigned zone
  d3.forceSimulation()
      .nodes(config.entries)
      .velocityDecay(0.4)
      .force("collision", d3.forceCollide().radius(12).strength(0.7))
      .force("restrict", restrict)
      .on("tick", ticked)
}