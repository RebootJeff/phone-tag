define(['backbone', 'views/AppView'], function(Backbone, AppView){
  var App = Backbone.Model.extend({
    initialize: function(){
      console.log("it's initializing!");
      new AppView();
    }
  });
  return App;
});
