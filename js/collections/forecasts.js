(function () {
  'use strict';

  var ForecastList = Backbone.Collection.extend({
    model: app.Forecast,

    comparator: function (forecast) {
      return forecast.get('latitude');
    }
  });

  app.Forecasts = new ForecastList();
})();