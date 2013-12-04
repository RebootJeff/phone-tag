define(['backbone'], function(Backbone){
  var map = Backbone.Model.extend({

    initialize: function(options){
      google.maps.visualRefresh = true;
      this.createMap();
      this.setCurrentMarker();
      this.socketSetup();
    },

    // Map options
    mapOptions: {
      center: new google.maps.LatLng(37.7837749, -122.4167),
      minZoom: 19,
      maxZoom: 21,
      draggable: false,
      panControl: false,
      zoomControl: false
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
      // timeout: 10000,
      maximumAge: 5000
    },

    markers: [],

    // Map functions
    createMap: function(){
      this.map = new google.maps.Map($("#map-canvas")[0], this.mapOptions);
      this.map.setOptions({styles: this.styles});
    },

    createMarker: function(data){
      var latLng = new google.maps.LatLng(data.location.lat, data.location.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        visible: false,
        icon: '../styles/images/evil.png'
      });
      marker.id = data.name;
      this.markers.push(marker);
      var that = this;
      if(marker.id === this.get('currentPlayer').get('name')){
        this.watchLocation(marker);
        marker.setVisible(true);
        marker.setIcon('../styles/images/wink.png');
      }else{
        setInterval(function(){that.markerRadarDisplay(marker);}, 5000);
      }
    },

    setCurrentMarker: function(){
      var that = this;
      var setCurrentPosition = function(position){
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.map.setCenter(currentPosition);
        that.map.setZoom(21);

        var playerLocation = {};
        playerLocation.name = that.get('currentPlayer').get('name');
        playerLocation.roomID = that.get('currentPlayer').get('roomID');
        playerLocation.location = {lat: position.coords.latitude, lng:position.coords.longitude};

        that.get('socket').emit('newPlayerMarker', playerLocation);
      };
      navigator.geolocation.getCurrentPosition(setCurrentPosition, that.handleError, that.gpsOptions);
    },

    updateMarkers: function(locations){
      var marker;
      for(var i = 0; i < this.markers.length; i++){
        marker = this.markers[i];
        if(marker.id !== this.get('currentPlayer').get('name')){
          marker.setPosition(new google.maps.LatLng(locations[marker.id].lat, locations[marker.id].lng));
          this.setDistanceFromUser(marker);
          console.log('distance from current player is: ',marker.distanceFromCurrentPlayer);
          if(locations[marker.id]){
            marker.setPosition(new google.maps.LatLng(locations[marker.id].lat, locations[marker.id].lng));
          }
        }
      }
    },

    setDistanceFromUser: function(marker){
      marker.distanceFromCurrentPlayer = google.maps.geometry.spherical.computeDistanceBetween(this.currentPlayerMarker.position, marker.position);
    },

    removeMarker: function(data){
      console.log(data);
      var playerName = data.username;
      var newLocations = data.newLocations;
      var markers = this.markers;
      for( var i = 0; i < markers.length; i++ ){
        var marker = markers[i];
        if( marker.id === playerName ){
          marker.setVisible(false);
        }
      }
      this.updateMarkers(newLocations);
    },

    handleError: function(err){
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },

    watchLocation: function(marker){
      var that = this;

      var watchCurrentPosition = function(position){
        console.log("watchCurrentPosition is getting called");
        var socket = that.get('socket');
        var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var playerLocation = {};
        playerLocation.name = that.get('currentPlayer').get('name');
        playerLocation.roomID = that.get('currentPlayer').get('roomID');
        playerLocation.location = {lat: position.coords.latitude, lng:position.coords.longitude};

        that.currentPlayerMarker = marker;
        that.map.panTo(currentPosition);
        marker.setPosition(currentPosition);
        socket.emit('sendLocationFromPlayer', playerLocation);
      };
      navigator.geolocation.watchPosition(watchCurrentPosition, that.handleError, that.gpsOptions);
    },

    checkPlayersToTag: function(){
      var tagged = [],
          marker,
          player,
          response;

      for(var i = 0; i < this.markers.length; i++){
        marker = this.markers[i];
        if(marker.distanceFromCurrentPlayer < 10 && marker.id !== this.get('currentPlayer').get('name')){
          player = {player: marker.id, roomID: this.get('currentPlayer').get('roomID')};
          tagged.push(player);
        }
      }
      response = {
        taggedPlayers: tagged,
        tagger: this.get('currentPlayer').get('name'),
        roomID: this.get('currentPlayer').get('roomID')
      };
      this.get('socket').emit('tagPlayers', response);
    },

    setPlayerDead: function(player){
      var marker;

      for(var i = 0; i < this.markers.length; i++){
        marker = this.markers[i];
        if(marker.id === player.name){
          marker.setIcon('../styles/images/heart-broken.png');
          return;
        }
      }
    },

    setPlayerAlive: function(player){
      var marker;
      if(player.name === this.get('currentPlayer').get('name')){
        return this.currentPlayerMarker.setIcon('../styles/images/wink.png');
      }

      for(var i = 0; i < this.markers.length; i++){
        marker = this.markers[i];
        if(marker.id === player.name){
          return marker.setIcon('../styles/images/evil.png');
        }
      }
    },

    socketSetup: function(){
      var that = this;
      this.get('socket').on('createMarker', function(data){that.createMarker(data);});
      this.get('socket').on('sendLocationsToPlayer', function(data){that.updateMarkers(data);});
      this.get('socket').on('playerAlive', function(data){that.setPlayerAlive(data);});
      this.get('socket').on('playerDead', function(data){that.setPlayerDead(data);});
    },

    markerRadarDisplay: function(marker){
      if(marker.id !== this.get('currentPlayer').get('name')){
        if(marker.timer){clearInterval(marker.timer);}
        timeShown = marker.distanceFromCurrentPlayer / 150 * 5000;
        if(timeShown < 800){
          timeShown = 800;
        }else if(timeShown >= 5000){
          timeShown = 5000;
        }
        var that = this;
        marker.setVisible(true);
        // console.log('The time shown should be: '+ timeShown + 'ms');
        var timer = setInterval(function(){marker.setVisible(false);}, timeShown);
        marker.timer = timer;
      }
    }
  });
  return map;
});
