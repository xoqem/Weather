define([
  'underscore',
  'backbone',
  'configs/api'
], function(_, Backbone, apiConfig) {
  return Backbone.Model.extend({

    defaults: {
      currently: {}
    },

    label: '',

    urlRoot: function() {
      return [
        'https://api.forecast.io/forecast',
        apiConfig.forecastIoApiKey
      ].join('/');
    },

    initialize: function(attrs, options) {
      Backbone.Model.prototype.initialize(this, arguments);

      this.label = attrs.label;

      this.set('id', [
        attrs.latitude,
        attrs.longitude
      ].join(','));
    }
  });
});
