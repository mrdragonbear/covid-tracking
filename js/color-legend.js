function ColorLegend(_parentElem, _data, _config) {
  var vis = this;

  vis.parentElement = _parentElem;
  vis.data = _data;
  vis.config = _config;
  vis.displayData = _data;

  vis.initVis();
}
ColorLegend.prototype.initVis = function() {
  var vis = this;

  vis.selected = $('#variable-choice').val();
  vis.tbody = d3.select('#' + vis.parentElement)
      .append('table')
      .attr('id', 'legend')
      .append('tbody');
  vis.wrangleData();
};
ColorLegend.prototype.wrangleData = function() {
  var vis = this;

  vis.displayData = vis.data.filter(d => d.name === vis.selected);

  vis.updateVis()
};
ColorLegend.prototype.updateVis = function() {
  var vis = this;

  var rows = vis.tbody.selectAll('tr')
      .data(vis.displayData);
  rows.enter()
      .append('tr')
      .merge(rows)
      .call(makeRow, vis);
  rows.exit().remove();
};
ColorLegend.prototype.selectionChanged = function(newSelVar) {
  var vis = this;
  vis.selected = newSelVar;
  vis.wrangleData();
};

function makeRow(elem, vis) {
  elem.html("");
  elem.append('td')
      .attr('class', 'color-dot')
      .append('span')
      .attr('class', 'dot')
      .style('background-color', d => mapVis.colorScales[vis.selected](d.level));
  elem.append('td')
      .append('p')
      .text(d => d.levelName)
      .attr('class', 'label');
  elem.append('td')
      .append('p')
      .text(d => d.description)
      .attr('class', 'description');
}