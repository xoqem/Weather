define([
  'jquery',
  'underscore',
  'backbone',
  'models/forecast',
  'views/forecast',
  'collections/forecasts',
  'collections/geoNamesSearchResults',
  'text!templates/app.tpl'
], function($, _, Backbone, ForecastModel, ForecastView, ForecastCollection, GeoNamesSearchResultsCollection,
  appTemplate) {

  return Backbone.View.extend({

    el: 'body',
    template: _.template(appTemplate),

    forecastCollection: new ForecastCollection(),
    geoNamesSearchResultsCollection: new GeoNamesSearchResultsCollection(),

    events: {
      'keypress #latitude-input': 'locationInput_keypressHandler',
      'keypress #longitude-input': 'locationInput_keypressHandler'
    },

    initialize: function () {
      this.listenTo(this.forecastCollection, 'add', this.forecastCollection_addHandler);
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    },

    forecastCollection_addHandler: function (forecast) {
      var view = new ForecastView({ model: forecast });
      this.$('#forecast-list').append(view.render().el);
    },

    locationInput_keypressHandler: function (e) {
      var latitudeInput = this.$('#latitude-input');
      var longitudeInput = this.$('#longitude-input');
      var latitude = latitudeInput.val().trim();
      var longitude = longitudeInput.val().trim();

      if (e.which !== 13 || !latitude || !longitude) {
        return;
      }

      var forecastModel = new ForecastModel({
        latitude: latitude,
        longitude: longitude
      });
      this.forecastCollection.push(forecastModel);

      // fetch with data type jsonp to workaround same origin issues
      forecastModel.fetch({
        dataType: 'jsonp'
      });
    }
  });
});
