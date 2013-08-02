define([
  'underscore',
  'backbone',
  'models/forecast'
], function(_, Backbone, ForecastModel) {
  return Backbone.Collection.extend({
    model: ForecastModel,

    comparator: function (forecast) {
      return forecast.get('latitude');
    }
  });
});
