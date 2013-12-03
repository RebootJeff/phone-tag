define(['backbone', '../models/otherPlayer'], function(Backbone, OtherPlayer){
  var otherPlayers = Backbone.Collection.extend({
    model: OtherPlayer,

    initialize: function(){
    }
  });
  return otherPlayers;
});
