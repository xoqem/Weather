define([
  'jquery',
  'backbone',
  'models/geoNamesSearchResult',
  'configs/api'
], function($, Backbone, GeoNameSearchResultModel, apiConfig) {
  return Backbone.Collection.extend({
    model: GeoNameSearchResultModel,

    setSearchQuery: function(q) {
      this._query = q;
    },

    url: function() {
      var params = $.param({
        formatted: true,
        q: this._query,
        maxRows: 5,
        style: 'medium',
        username: apiConfig.geoNamesUserName
      });

      return [
        'http://api.geonames.org/searchJSON',
        params
      ].join('?');
    },

    parse: function(response) {
      return response.geonames;
    }
  });
});
