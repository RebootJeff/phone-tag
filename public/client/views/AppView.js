define(['backbone', 'jquery'], function(Backbone, $){
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.append("<h1>Hello</h1>");
      return this;
    }
  });
  return AppView;
});
