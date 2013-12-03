define(['backbone', 'handlebars', 'text!../templates/login.html'], function(Backbone, Handlebars, LoginTemplate){
  var LoginView = Backbone.View.extend({
    template: LoginTemplate,

    initialize: function(){
      this.render();
    },

    render: function(){
      $('#container').html(Handlebars.compile(this.template));
      return this;
    }
  });
  return LoginView;
});
