define(['backbone', 'handlebars', 'text!../templates/home.html'], function(Backbone, Handlebars, HomeTemplate){
  var HomeView = Backbone.View.extend({
    template: HomeTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = Handlebars.compile(this.template);
      return this;
    }
  });
  return HomeView;
});
