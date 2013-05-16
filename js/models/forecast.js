define([
  "underscore",
  "backbone"
], function(u, b) {
  return Backbone.Model.extend({
    defaults: {
      latitude: 47.6097,
      longitude: -122.3331,
      temperature: null
    }
  });
});
