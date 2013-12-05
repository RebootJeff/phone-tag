define(['backbone', 'handlebars', '../templates/join', '../models/currentPlayer', '../models/otherPlayer'], function(Backbone, Handlebars, JoinTemplate, CurrentPlayer, OtherPlayer){
  var JoinView = Backbone.View.extend({
    template: Handlebars.compile(JoinTemplate),

    initialize: function(options){
      this.model.on('joinRender', this.render, this);
      this.render();
    },

    render: function(){
      $('#container').html(this.template);
      var playerList = this.model.get('otherPlayers');
      playerList.map(function(model){
        $('tbody').append('<tr><td>' + model.get('name') + '</td></tr>');
      });

      return this;
    }

  });
  return JoinView;
});
