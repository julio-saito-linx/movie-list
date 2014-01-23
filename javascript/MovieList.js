/*global MoviesMVC */
'use strict';

MoviesMVC.module('MovieList', function (MovieList, App, Backbone, Marionette, $, _) {
  // MovieList Router
  // ---------------
  //
  // Handle routes to show the active vs complete todo items
  MovieList.Router = Marionette.AppRouter.extend({
    appRoutes: {
      //'*filter': 'filterItems'
      '': 'goHome',
      'search': 'goSearch',
      'about': 'goAbout'
    }
  });

  // MovieList Controller (Mediator)
  // ------------------------------
  //
  // Control the workflow and logic that exists at the application
  // level, above the implementation detail of views and models
  MovieList.Controller = function () {
  };

  _.extend(MovieList.Controller.prototype, {
    // Start the app by showing the appropriate views
    // and fetching the list of todo items, if there are any
    start: function () {
      this.jMenu = $('.mainMenu');
      this.jMain = $('.main');
    },

    goHome: function() {
      this.jMenu.find('li').removeClass('active');
      var jHomeMenu = this.jMenu.find('.home');
      jHomeMenu.addClass('active');

      var source   = $("#home-template").html();
      var template = Handlebars.compile(source);
      this.jMain.html(template);
    },

    goSearch: function() {
      this.jMenu.find('li').removeClass('active');
      var jSearchMenu = this.jMenu.find('.search');
      jSearchMenu.addClass('active');

      var source   = $("#search-template").html();
      var template = Handlebars.compile(source);
      this.jMain.html(template);
    },

    goAbout: function() {
      this.jMenu.find('li').removeClass('active');
      var jAboutMenu = this.jMenu.find('.about');
      jAboutMenu.addClass('active');

      var source   = $("#about-template").html();
      var template = Handlebars.compile(source);
      this.jMain.html(template);
    }
  });

  // MovieList Initializer
  // --------------------
  //
  // Get the MovieList up and running by initializing the mediator
  // when the the application is started, pulling in all of the
  // existing Todo items and displaying them.
  MovieList.addInitializer(function () {
    var controller = new MovieList.Controller();
    __MELD_LOG('Controller', controller, 11);

    controller.router = new MovieList.Router({
      controller: controller
    });
    __MELD_LOG('Router', controller.router, 12);

    controller.start();
  });
});
