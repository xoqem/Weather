define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      name: null, // city (or identifying info)
      adminCode1: null, // state or region
      countryName: null,
      lat: null,
      lng: null
    }
  });
});
