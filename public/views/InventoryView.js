define(['backbone', 'handlebars', 'text!../templates/inventory.html'], function(Backbone, Handlebars, InventoryTemplate){
  var InventoryView = Backbone.View.extend({
    template: InventoryTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = Handlebars.compile(this.template);
      return this;
    }

  });
  return InventoryView;
});
