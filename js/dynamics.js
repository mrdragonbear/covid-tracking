$('#variable-choice').change(function() {
  var selected = $(this).val();
  mapVis.selectionChanged(selected);
  colorLegend.selectionChanged(selected);
});