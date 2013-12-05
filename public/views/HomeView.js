define(['backbone', 'handlebars', '../templates/home'], function(Backbone, Handlebars, HomeTemplate){
  var HomeView = Backbone.View.extend({
    template: Handlebars.compile(HomeTemplate),

    initialize: function(){
      this.render();
    },

    render: function(){
      $('#container').html(this.template);
      return this;
    }
  });
  return HomeView;
});
