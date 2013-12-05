define(['backbone', 'handlebars', '../templates/login'], function(Backbone, Handlebars, LoginTemplate){
  var LoginView = Backbone.View.extend({
    template: Handlebars.compile(LoginTemplate),

    initialize: function(){
      this.render();
    },

    render: function(){
      $('#container').html(this.template);
      return this;
    }
  });
  return LoginView;
});
