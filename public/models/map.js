define(['backbone'], function(Backbone){
  var map = Backbone.Model.extend({

    initialize: function(){
      google.maps.visualRefresh = true;
      this.createMap();
      this.setCurrentMarker();
    },

    // Map options
    mapOptions: {
      center: new google.maps.LatLng(37.7837749, -122.4167),
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

    gpsOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    },

    markers: [],

    // Map functions
    createMap: function(){
      this.map = new google.maps.Map($("#map-canvas")[0], this.mapOptions);
      this.map.setOptions({styles: this.styles});
    },

    createMarker: function(latLng){
      latLng = latLng || new google.maps.LatLng(37.7837749, -122.4167);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
      this.markers.push(marker);
      this.watchLocation(marker);
    },

    setCurrentMarker: function(){
      var that = this;
      var setCurrentPosition = function(position){
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.createMarker(currentPosition);
        that.center = currentPosition;
        that.map.setZoom(16);
        that.map.setCenter(that.center);
      };
      navigator.geolocation.getCurrentPosition(setCurrentPosition, that.handleError, that.gpsOptions);
    },

    // Getting timeout error at watchLocation
    handleError: function(err){
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },

    watchLocation: function(marker){
      var that = this;
      var watchCurrentPosition = function(position){
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        marker.setPosition(currentPosition);
        that.map.panTo(currentPosition);
      };
      navigator.geolocation.watchPosition(watchCurrentPosition, that.handleError, that.gpsOptions);
    }
  });
  return map;
});
