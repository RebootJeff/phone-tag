define(['backbone', 'handlebars', 'text!../templates/login.html'], function(Backbone, Handlebars, LoginTemplate){
  var LoginView = Backbone.View.extend({
    template: LoginTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = Handlebars.compile(this.template);
      return this;
    }
  });
  return LoginView;
});
