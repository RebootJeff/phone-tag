define(['backbone', 'handlebars', 'text!../templates/game.html','./MapView'], function(Backbone, Handlebars, GameTemplate, MapView){
  var GameView = Backbone.View.extend({
    template: GameTemplate,

    initialize: function(options){
      this.render();
      new MapView({currentPlayer: this.model.get('currentPlayer'), socket: options.socket});
      this.model.on('startGame', this.startGame, this);
    },

    startGame: function(){
      var timeLeft, minLeft, secLeft;
      var startTime = this.model.endTime - (this.model.get('timeLimit') * 60 * 1000);
      var that = this;
      $('#container').append('<div class="timer"></div>');
      setInterval(function(){
        if (Date.now() >= startTime) {
          timeLeft = that.model.endTime - Date.now();
          minLeft = Math.floor(timeLeft / (60 * 1000));
          secLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
          $('.timer').html('<p>'+minLeft+':'+secLeft+'</p>');
        }
      }, 1000);
    },

    render: function(){
      $('#container').html(Handlebars.compile(this.template));
      return this;
    }

  });
  return GameView;
});
