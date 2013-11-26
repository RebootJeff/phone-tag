define(['backbone', 'views/AppView'], function(Backbone, AppView){
  var App = Backbone.Model.extend({
    initialize: function(){
      new AppView();
    }
  });
  return App;
});
