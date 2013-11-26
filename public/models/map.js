define(['backbone'], function(Backbone){
  var map = Backbone.Model.extend({

    initialize: function(){
      this.createMap();
      this.createMarker();
      this.updateLocation();
      this.on('updateLocation', this.updateLocation, this);
    },

    // Map styles
    mapOptions: {
      center: new google.maps.LatLng(37.7837749,-122.4167),
      zoom: 11
    },

    styles: [
      {
        stylers: [
          { hue: "#6699cc" },
          { saturation: -20 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ],

    // Map functions
    createMarker: function(latLng){
      latLng = latLng || new google.maps.LatLng( 37.7837749,-122.4167);
      new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    },

    createMap: function(){
      this.map = new google.maps.Map($("#map-canvas")[0], this.mapOptions);
      this.map.setOptions({styles: this.styles});
    },

    updateLocation: function(){
      var that = this;
      navigator.geolocation.getCurrentPosition(function(position){
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.createMarker(currentPosition);
        that.center = currentPosition;
        that.map.setZoom(16);
        that.map.setCenter(that.center);
      });
    }
  });
  return map;
});
