define(['backbone', 'handlebars', 'text!../templates/join.html', '../models/currentPlayer', '../models/otherPlayer'], function(Backbone, Handlebars, JoinTemplate, CurrentPlayer, OtherPlayer){
  var JoinView = Backbone.View.extend({
    template: JoinTemplate,

    initialize: function(options){
      this.model.on('joinRender', this.render, this);
      this.render();
    },

    render: function(){
      $('#container').html(Handlebars.compile(this.template));
      // var playerList = this.model.get('otherPlayers').models;
      // for (var i = 0; i < playerList.length; i++) {
      //   $('tbody').append('<tr><td>' + playerList[i].get('name') + '</td></tr>');
      // }
      var playerList = this.model.get('otherPlayers');
      playerList.map(function(model){
        $('tbody').append('<tr><td>' + model.get('name') + '</td></tr>');
      });
      return this;
    }

  });
  return JoinView;
});
