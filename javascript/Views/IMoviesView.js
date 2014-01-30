/*global MoviesMVC */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette) {

  Views.IMoviesView = Marionette.ItemView.extend({
    template: '#imovies-template',

    onBeforeRender: function() {
      var toSend = {};
      toSend.searches = this.collection.toJSON();

      var tenYears = _.range(1901, 2022, 10);
      toSend.yearsBlock = [];
      for (var i = 0; i < (tenYears.length - 1); i++) {
        var eachYear = _.range(tenYears[i], tenYears[i+1]);
        toSend.yearsBlock.push(eachYear);
      }

      tenYears = _.range(1900, 2021, 10);
      toSend.yearRanges = [];
      for ( i = 0; i < (tenYears.length - 1); i++) {
        toSend.yearRanges.push({
          start: tenYears[i],
          end: tenYears[i+1]
        });
      }

      // set a FAKE model to send JSON
      this.model = {
        toJSON: function() {
          return toSend;
        }
      };
    },

  });

});