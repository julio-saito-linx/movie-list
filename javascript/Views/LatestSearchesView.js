/*global MoviesMVC, Handlebars */

'use strict';
MoviesMVC.module('MovieList.Views', function (Views, App, Backbone, Marionette, $) {

  // TODO: fell like this must be a CollectionView
  Views.LatestSearchesView = Marionette.ItemView.extend({
    tagName: 'li',
    
    className: 'dropdown',
    
    template: 'latestSearches',

    events: {
      'click li a': 'linkClicked',
      'click li .glyphicon-remove': 'removeClicked'
    },

    ui:{
      link_list: '#link-list',
      dropdown_title: '#dropdown-title'
    },

    collectionEvents: {
      'add': 'addSearch',
      'remove': 'removeListElement',
      'reset': 'renderAllSearches'
    },

    initialize: function() {
      MoviesMVC.vent.on('results_received', this.updateDropdownTitle, this);
    },

    renderAllSearches: function() {
      this.collection.each(function(searchModel) {
        this.addDropdownItem(searchModel);
      }.bind(this));
    },

    addSearch: function(searchModel) {
      searchModel.save();
      this.addDropdownItem(searchModel);
    },

    updateDropdownTitle: function(searchModel) {
      this.ui.dropdown_title.text(this.getSearchFormated(searchModel));
    },

    getSearchFormated: function(searchModel) {
      var query = searchModel.get('query');
      var results = searchModel.get('results');
      var resultsCount = results.length;
      return query + ' ['+ resultsCount +']';
    },

    addDropdownItem: function(searchModel) {
      this.ui.link_list.prepend(this.getLiHtml(searchModel));
    },

    getLiHtml: function(searchModel) {
      var id = searchModel.get('id');
      return  '<li>' +
                '<a href="#" data-id="'+ id +'">' +
                  '<span class="glyphicon glyphicon-remove"></span>' +
                   this.getSearchFormated(searchModel) +
                '</a>' +
              '</li>';
    },

    getLatest: function() {
      this.jTitle_a = this.$('#dropdown-title');
      return this.jTitle_a.text();
    },

    linkClicked: function(e) {
      e.preventDefault();
      var id = $(e.target).data('id');
      var searchModel = this.collection.get(id);
      MoviesMVC.vent.trigger('query_received', searchModel.get('query'));
    },

    removeClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var id = $(e.target).parent().data('id');
      var searchModel = this.collection.get(id);
      searchModel.destroy();
    },

    removeListElement: function(model) {
      var jA = this.ui.link_list.find('[data-id="' + model.id + '"]');
      if(jA){
        var jLi = jA.parent();
        jLi.remove();
      }
    }
  });

});