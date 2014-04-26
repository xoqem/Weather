require.config({
  paths: {
    templates : '../templates',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min',
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require([
  'views/app'
], function(AppView){
  new AppView();
});
