define([
  'underscore',
  'backbone',
  'configs/api'
], function(_, Backbone, apiConfig) {
  return Backbone.Model.extend({

    defaults: {
      currently: {}
    },

    urlRoot: function() {
      return [
        'https://api.forecast.io/forecast',
        apiConfig.apiKey
      ].join('/');
    },

    initialize: function(attrs, options) {
      Backbone.Model.prototype.initialize(this, arguments);

      this.set('id', [
        attrs.latitude,
        attrs.longitude
      ].join(','));
    }
  });
});
