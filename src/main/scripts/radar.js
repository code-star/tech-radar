// Copyright (c) 2019 Codestar
// See https://github.com/code-star/tech-radar for license details and attribution

function draw_radar(config) {

  function polar(car) {
    return {
      r: Math.sqrt(car.x * car.x + car.y * car.y),
      t: Math.atan2(car.y, car.x)
    }
  }

  // cartesian conversion from polar, taking into account the SVG coordinate system
  // which has +x to the right, and -y to the top
  // I use polar coordinates with the angle t in degrees against -y, going clockwise
  // this places the first segment at the top right (starting at 12 o'clock position)
  function cartesian(polar) {
    return {
      x: polar.r * Math.sin(rad(polar.t)),
      y: - polar.r * Math.cos(rad(polar.t))
    }
  }

  // custom random number generator, to make random sequence reproducible
  // source: https://stackoverflow.com/questions/521295
  let seed = 42;
  function random() {
    let x = Math.sin(seed++) * 10000;
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
    return `translate(${x},${y})`;
  }

  function min(x, y) {
    return x < y ? x : y;
  }

  function equal(a, b, eps = 0.0001) {
    return Math.abs(a - b) <= eps;
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
    let r_min = ringBounds(ring).lower;
    let r_max = ringBounds(ring).upper;
    let t_min = seg * segment_arc;
    let t_max = (seg + 1) * segment_arc;
    return {
      randomPos: function() {
        return {
          r: random_between(r_min, r_max),
          t: random_between(t_min, t_max)
        }
      },
      color: function() {
        return segment_color(seg, segmentCount)
      },
      adjust: function(d, alpha) {
        let new_polar = {
          r: Math.max(r_min, Math.min(r_max, d.x)),
          t: Math.max(t_min, Math.min(t_max, d.y))
        };
        d.x = new_polar.r;
        d.y = new_polar.t;
        d.cx = cartesian(new_polar).x;
        d.cy = cartesian(new_polar).y;
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

  function segment_pie(seg, max, radius){
    let xc = 80 * seg;
    let yc = 100;
    let x1 = xc + Math.sin(i * rad(segment_arc)) * radius;
    let y1 = yc - Math.cos(i * rad(segment_arc)) * radius;
    let x2 = xc + Math.sin((i+1) * rad(segment_arc)) * radius;
    let y2 = yc - Math.cos((i+1) * rad(segment_arc)) * radius;

    return `M ${xc} ${yc} D ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x1} ${y1} ${x2} ${y2} Z`
  }

  var svg = d3.select("svg#" + config.svg_id)
      .style("background-color", config.colors.background)
      .attr("height", config.height)
      .attr("width", config.width);

  function toggleCat(d){
    let cat = d3.select(this);
    d.active = ! d.active;
    cat.select("rect")
        .style("fill", d.active ? "#262" : "#131");
    cat.select("text")
        .style("fill", d.active ? "#ffc" : "#666");
  }

  // create list of categories, to allow on/off selection
  let cat_list = svg.append("g")
      .attr("id", "categories");

  let cats = cat_list.selectAll(".category")
      .data(config.segments)
      .enter()
        .append("g")
          .attr("class", "category");

  cats.each(function(d, i){
    let cat = d3.select(this)
        .attr("id", `cat-${d.id}`)
        .attr("transform", translate(10, 30 + i * 36))
        .style("user-select", "none")
        .on("click", toggleCat);

    cat.append("rect")
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", d.active ? "#262" : "#131");
    cat.append("text")
        .attr("transform", translate(0, 10))
        .style("font-family", "sans-serif")
        .style("font-size", "18px")
        .style("fill", d.active ? "#ffc" : "#666")
        .text(d.name);
    let bb = cat.select("text").node().getBBox();
    cat.select("rect")
        .attr("x", -5)
        .attr("y", -12)
        .attr("width", bb.width + 10)
        .attr("height", bb.height + 10)
  });

  var radar = svg.append("g");

  // position radar in middle of the svg
  radar.attr("transform", translate(config.width / 2, config.height / 2));

  var grid = radar.append("g");

  function rad(deg) {
    return Math.PI * deg / 180.0;
  }

  function deg(rad) {
    return 180.0 * rad / Math.PI
  }

  // draw segment lines and segment background
  const segment_count = config.segments.length;
  const segment_arc = 360.0 / segment_count;
  for (var i = 0; i < segment_count; i++) {
    var x2 = Math.sin(i * rad(segment_arc)) * radius;
    var y2 = - Math.cos(i * rad(segment_arc)) * radius;
    grid.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", x2).attr("y2", y2)
        .style("stroke", config.colors.grid)
        .style("stroke-width", 1)
    grid.append("path")
        .attr("fill", segment_color(i, segment_count))
        .attr("d", segment_pie(i, segment_count, radius))
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
      .attr("id", "rink");

  // info bubble
  var bubble = radar.append("g")
      .attr("id", "bubble")
      .attr("x", 0).attr("y", 0)
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("user-select", "none");
  bubble.append("rect")
      .attr("rx", 4)
      .attr("ry", 4)
      .style("fill", "#000");
  bubble.append("text")
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .style("fill", "#fff");
  bubble.append("path")
      .attr("d", "M 0,0 10,0 5,12 z")
      .style("fill", "#000");

  // position each entry randomly in its segment
  for(var i=0; i<config.entries.length;i++){
    var entry = config.entries[i];
    entry.segment = segment(catIndex(entry.category), entry.score, segments.length);
    entry.point = entry.segment.randomPos();

    // polar for simulation - keep blips in correct ring and segment
    entry.x = entry.point.r;
    entry.y = entry.point.t;

    // cartesian for drawing
    entry.cx = cartesian(entry.point).x;
    entry.cy = cartesian(entry.point).y;
    entry.color = entry.segment.color();
  }

  function showBubble(d){
    let lines = d.label.split("\n");
    let text = d3.select("#bubble text");
    text.selectAll("*").remove();
    for(let i = 0; i < lines.length; i++){
      text.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.1em")
          .text(lines[i]);
    }
    let bbox = text.node().getBBox();
    d3.select("#bubble")
        .attr("transform", translate(d.cx - bbox.width / 2, d.cy - bbox.height - 20))
        .style("opacity", 0.8);
    d3.select("#bubble rect")
        .attr("x", -5).attr("y", 0)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 4);
    d3.select("#bubble path")
        .attr("transform", translate( bbox.width / 2 - 5, bbox.height + 4));
  }

  function hideBubble(d){
    d3.select("#bubble")
        .attr("transform", translate(0, 0))
        .style("opacity", 0);
  }

  // draw blips on the radar
  var blips = rink.selectAll(".blip")
      .data(config.entries)
      .enter()
      .append("g")
      .attr("class", "blip")
      .on("mouseover", showBubble)
      .on("mouseout", hideBubble);

  // configure each blip
  blips.each(function(d){
    let blip = d3.select(this);

    // blip shape and position
    blip.attr("transform", translate(d.cx, d.cy))
        .append("circle")
        .attr("r", 10)
        .attr("fill", d.color);
  });

  function ticked() {
    blips.attr("transform", function(d){
      return translate(d.cx, d.cy)
    })
  }

  function restrict(alpha){
    for (var i = 0; i < config.entries.length; i++){
      let entry = config.entries[i];
      entry.segment.adjust(entry, alpha);
    }
  }

  // make sure blips do not overlap, but stay within their assigned zone
  d3.forceSimulation()
      .nodes(config.entries)
      .velocityDecay(0.7)
      .force("collision", d3.forceCollide().radius(12).strength(0.1))
      .force("restrict", restrict)
      .on("tick", ticked)
}