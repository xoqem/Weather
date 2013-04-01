$(function ($) {
  'use strict';

  app.AppView = Backbone.View.extend({

    el: '#weatherapp',

    latitudeInput: null,
    longitudeInput: null,

    events: {
      'keypress #latitude-input': 'locationInput_keypressHandler',
      'keypress #longitude-input': 'locationInput_keypressHandler'
    },

    initialize: function () {
      this.latitudeInput = this.$('#latitude-input');
      this.longitudeInput = this.$('#longitude-input');

      this.listenTo(app.Forecasts, 'add', this.forecasts_addHandler);
    },

    render: function () {
      // TODO: refresh forecast list
    },

    forecasts_addHandler: function (forecast) {
      var view = new app.ForecastView({ model: forecast });
      $('#forecast-list').append(view.render().el);
    },

    locationInput_keypressHandler: function (e) {
      if (e.which !== ENTER_KEY ||
          !this.latitudeInput.val().trim() ||
          !this.longitudeInput.val().trim()) {
        return;
      }

      // TODO: Trigger new forecast request from app.Forecasts and remove test code below
      app.Forecasts.create(
        {
          latitude: this.latitudeInput.val().trim(),
          longitude: this.longitudeInput.val().trim()
        }
      );

      // TODO: show some loading indicator while forecast is fetched

      this.latitudeInput.val('');
      this.longitudeInput.val('');
    }
  });

  new app.AppView();
});
