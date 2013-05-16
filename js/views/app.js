define([
  'jquery',
  'underscore',
  'backbone',
  'views/forecast',
  'collections/forecasts'
], function($, _, Backbone, ForecastView, ForecastCollection) {
  return Backbone.View.extend({

    el: 'body',
    template: _.template($('#app-template').html()),

    apiKey: 'efd1475503c090acf47ce7bdfff61941',

    forecastCollection: new ForecastCollection(),

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

      var url = [
        'https://api.forecast.io/forecast/',
        this.apiKey,
        '/',
        latitude,
        ',',
        longitude
      ].join('');
      console.log('url:', url);

      me = this;
      $.ajax({
        dataType: "jsonp",
        url: url,
        success: function(result, status, xhr) {
          me.forecastCollection.create({
            latitude: result.latitude,
            longitude: result.longitude,
            temperature: result.currently.temperature
          });
        },
        error: function(xhr, status, error) {
          // TODO: show error message
        },
        complete: function(xhr, status) {
          // TODO: remove loading indicator
        }
      });
    }
  });
});