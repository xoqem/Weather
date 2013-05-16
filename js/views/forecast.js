define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/forecast.tpl'
], function($, _, Backbone, forecastTemplate) {
  return Backbone.View.extend({
    tagName:  'li',

    template: _.template(forecastTemplate),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});