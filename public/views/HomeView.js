define(['backbone', '../templates/home'], function(Backbone, HomeTemplate){
  var HomeView = Backbone.View.extend({
    template: HomeTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = this.template();
      return this;
    }

  });
  return HomeView;
});
