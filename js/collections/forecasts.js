define([
  'backbone',
  'models/forecast'
], function(Backbone, ForecastModel) {
  return Backbone.Collection.extend({
    model: ForecastModel,

    comparator: function (forecast) {
      return forecast.get('latitude');
    }
  });
});
