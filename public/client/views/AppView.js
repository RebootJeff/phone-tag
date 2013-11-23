var AppView = Backbone.View.extend({

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html('<h1>Hello World</h1>');
    return this;
  }
});