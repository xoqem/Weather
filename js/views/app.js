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
      'keypress #location-input': 'locationInput_keypressHandler'
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
      var location = this.$('#location-input').val().trim();

      if (e.which !== 13 || !location) {
        return;
      }

      this.geoNamesSearchResultsCollection.setSearchQuery(location);
      this.geoNamesSearchResultsCollection.fetch({
        success: _.bind(function() {
          var model = this.geoNamesSearchResultsCollection.first();
          if (!model) return;

          var forecastModel = new ForecastModel({
            latitude: model.get('lat'),
            longitude: model.get('lng'),
            label: [
              model.get('name'),
              model.get('adminName1'),
              model.get('countryName')
            ].join(', ')
          });
          this.forecastCollection.push(forecastModel);

          // fetch with data type jsonp to workaround same origin issues
          forecastModel.fetch({
            dataType: 'jsonp'
          });
        }, this)
      });
    }
  });
});
