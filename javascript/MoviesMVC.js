/*global Backbone */
'use strict';

var MoviesMVC = new Backbone.Marionette.Application();
__MELD_LOG('MoviesMVC', MoviesMVC, 10);

MoviesMVC.addRegions({
  main: '#main'
});

MoviesMVC.on('initialize:after', function () {
  Backbone.history.start();
});