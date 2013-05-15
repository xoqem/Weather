  app.AppView = Backbone.View.extend({

    el: 'body',
    template: _.template($('#app-template').html()),

    apiKey: 'efd1475503c090acf47ce7bdfff61941',

    events: {
      'keypress #latitude-input': 'locationInput_keypressHandler',
      'keypress #longitude-input': 'locationInput_keypressHandler'
    },

    initialize: function () {
      this.listenTo(app.Forecasts, 'add', this.forecasts_addHandler);
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    },

    forecasts_addHandler: function (forecast) {
      console.log('forecasts_addHandler');
      var view = new app.ForecastView({ model: forecast });
      this.$('#forecast-list').append(view.render().el);
    },

    locationInput_keypressHandler: function (e) {
      var latitudeInput = this.$('#latitude-input');
      var longitudeInput = this.$('#longitude-input');
      var latitude = latitudeInput.val().trim();
      var longitude = longitudeInput.val().trim();

      if (e.which !== ENTER_KEY || !latitude || !longitude) {
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

      $.ajax({
        dataType: "jsonp",
        url: url,
        success: function(result, status, xhr) {
          app.Forecasts.create({
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
