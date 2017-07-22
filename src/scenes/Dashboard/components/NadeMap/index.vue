<style scoped>
  .map {
    width: 100%;
    padding-bottom: 100%;
    opacity: 0;

    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -ms-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
  }

  .map.loaded {
    opacity: 100;
  }
</style>

<template>
  <div ref="container" class="map-container">
    <gmap-map
      ref="map"
      :class="{ map: true, loaded: mapLoaded }"
      :center="{ lat: 0, lng: 0 }"
      :streetViewControl="false"
      :options="{ streetViewControl: false, mapTypeControl: false }"
      :zoom="1"
      :mapTypeControl="false"
      @idle="handleMapLoaded"
      @maptypeid_changed="handleMapTypeIdChange"
      @click="handleMapClick"
    ></gmap-map>
    <button @click="handleButtonClick">DoStuff</button>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'Map',
    data () {
      return {
        mapTypeId: 'Terrain',
        mapLoaded: false,
        sourceImg: new Image(1024, 1024),
      }
    },
    mounted () {
      this.$refs.map.resizePreserveCenter()
      this.sourceImg.setAttribute('crossOrigin', 'anonymous');
      this.sourceImg.src = 'http://i.imgur.com/9oFUzzo.png';

      window.addEventListener('resize', this.restoreCenter);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.restoreCenter);
    },
    methods: {
      setCenterPixel(x, y) {
        const projection = this.$refs.map.$mapObject.getProjection();
        const coord = projection.fromPointToLatLng(new google.maps.Point(x, y));

        console.log('setCenter', coord.lat(), coord.lng());
        this.$refs.map.$mapObject.setCenter(coord);
      },

      handleMapClick(e) {
        console.log('mapClick', e);
      },

      handleButtonClick() {
        const projection = this.$refs.map.$mapObject.getProjection();

        var flightPlanCoordinates = [
          projection.fromPointToLatLng(new google.maps.Point(112, 355)),
          projection.fromPointToLatLng(new google.maps.Point(130, 250)),
        ];

        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: false,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        flightPath.setMap(this.$refs.map.$mapObject);
      },

      restoreCenter() {
        const map = this.$refs.map.$mapObject;
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      },

      handleMapTypeIdChange() {

        var projection = this.$refs.map.$mapObject.getProjection();
        console.log('projection', projection);
        var coordinates = projection.fromPointToLatLng(
            new google.maps.Point(256, 256)
        );

        console.log('coords', coordinates);
        // this.$refs.map.$mapObject.setCenter(coordinates);
      },

      handleMapLoaded() {
        this.$refs.map.resizePreserveCenter()
        this.mapLoaded = true;
        const sourceImg = this.sourceImg;
        const sourceMap = this.$refs.map;

        // Normalizes the coords that tiles repeat across the x axis (horizontally)
        // like the standard Google map tiles.
        function getNormalizedCoord(coord, zoom) {
          var y = coord.y;
          var x = coord.x;

          // tile range in one direction range is dependent on zoom level
          // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
          var tileRange = 1 << zoom;

          // repeat across y-axis
          if (y < 0 || y >= tileRange) {
            y = (y % tileRange + tileRange) % tileRange;
          }

          // repeat across x-axis
          if (x < 0 || x >= tileRange) {
            x = (x % tileRange + tileRange) % tileRange;
          }

          return {x: x, y: y};
        }

        var moonMapType = new google.maps.ImageMapType({
          getTileUrl: function(rawCoord, zoom, ownerDocument = document) {

            let coord = getNormalizedCoord(rawCoord, zoom);
            const id = `${coord.x}/${coord.y}/${zoom}`;

            if (!this.cache) this.cache = {}
            if (this.cache[id]) {
              return this.cache[id];
            }

            var c = Math.pow(2, zoom);
            var tilex=coord.x,tiley=coord.y;
            if (this.imageWraps) {
              if (tilex<0) tilex=c+tilex%c;
              if (tilex>=c) tilex=tilex%c;
              if (tiley<0) tiley=c+tiley%c;
              if (tiley>=c) tiley=tiley%c;
            }
            else {
              if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
              {
                var blank = ownerDocument.createElement('DIV');
                blank.style.width = this.tileSize.width + 'px';
                blank.style.height = this.tileSize.height + 'px';
                return blank;
              }
            }

            var img = ownerDocument.createElement('img');

            img.id = "t_" + zoom + "_" + tilex + "_" + tiley;
            img.style.width = this.tileSize.width + 'px';
            img.style.height = this.tileSize.height + 'px';

            var canvas = ownerDocument.createElement('canvas');
            canvas.width = this.tileSize.width;
            canvas.height = this.tileSize.height
            var ctx = canvas.getContext("2d");
            ctx.drawImage(sourceImg,
              sourceImg.width / Math.pow(2, zoom) * tilex,
              sourceImg.height / Math.pow(2, zoom) * tiley,
              sourceImg.width / Math.pow(2, zoom),
              sourceImg.height / Math.pow(2, zoom),
              0,
              0,
              this.tileSize.width,
              this.tileSize.height
            );

            const dataUrl = canvas.toDataURL();
            this.cache[id] = dataUrl;
            return dataUrl;
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 4,
          minZoom: 0,
          radius: 1,
          name: 'Brooklyn'
        });

        this.$refs.map.$mapObject.mapTypes.set('brooklyn', moonMapType);
        this.$refs.map.$mapObject.setMapTypeId('brooklyn');
      },
    }
  }
</script>
