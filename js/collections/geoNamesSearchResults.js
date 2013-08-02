define([
  'jquery',
  'backbone',
  'models/geoNamesSearchResult',
  'configs/api'
], function($, Backbone, GeoNameSearchResultModel, apiConfig) {
  return Backbone.Collection.extend({
    model: GeoNameSearchResultModel,

    search: function(q) {
      this._query = q;
      this.fetch();
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
    }
  });
});
