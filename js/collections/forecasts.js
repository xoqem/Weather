(function () {
  'use strict';

  var ForecastList = Backbone.Collection.extend({
    model: function(attrs, options) {
      return new app.Forecast(attrs, options);
    },

    // FIXME: backbone collection is expecting a url, that it will hit to sync everytime an item
    // is added to the collection.  This is clearly not what we are wanting to do here when we get
    // a new forecast.  This makes me think that collection may be the wrong type of Backbone class
    // to represent the forecasts the user has fetched so far, as these will never be sent back to
    // the server.
    url: "http://example.com",

    comparator: function (forecast) {
      return forecast.get('latitude');
    }
  });

  app.Forecasts = new ForecastList();
})();