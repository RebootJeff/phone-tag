define(['backbone'], function(Backbone){
  var Player = Backbone.Model.extend({
    urlRoot: '/userAuth',

    initialize: function(){
    }
  });
  return Player;
});
