define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  return Backbone.Model.extend({
    defaults: {
      latitude: 47.6097,
      longitude: -122.3331,
      temperature: null
    }
  });
});
