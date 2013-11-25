define(['backbone','templates/home'], function(Backbone, Template){
  var AppView = Backbone.View.extend({

    template: Template,

    initialize: function(){
      this.render();
    },

    render: function(){
      return this;
    }
  });
  return AppView;
});
