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
    >
      <gmap-polyline
        :path="coords"
        :geodesic="false"
        :strokeOpacity="1.0"
        strokeColor="red"
        strokeWeight="3"
      ></gmap-polyline>
    </gmap-map>

  </div>
</template>

<script>
  /* eslint-disable */

  import generateTile from './generateTile.js';

  /**
   * Generates adds intermediate values between coordinates
   * This is done because Google Maps assumes the map is wrapped around a sphere, So it assumes it can pan around the sphere
   * Example: [{ x: 0, y: 0 }, { x: 100, y: 100 }] -> [{ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 100 }]
   * @param  {[Object]} input - Array with coordinate objects
   * @return {[Object]} - Array with coordinate objects
   */
  function generatePolyPath(input) {
    let result = [];

    for (let i = 0; i < input.length; i++) {
      let current = input[i];
      let next = input[i + 1];

      result.push(current);

      if(next) {
        const newX = (next.x + current.x) / 2;
        const newY = (next.y + current.y) / 2;

        result.push({
          x: newX,
          y: newY,
        });
      }
    }

    return result;
  }

  /**
   * Normalizes the coords that tiles repeat across the x axis (horizontally)
   * Like the standard Google map tiles.
   * @param  {Object} coord - 2d vector containing X, Y values
   * @param  {Int} zoom - Zoom multiplier
   * @return {Object} - 2d vector containing X, Y values
   */
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


  export default {
    name: 'Map',
    props: ['entries'],
    data () {
      return {
        mapTypeId: 'Terrain',
        mapLoaded: false,
        sourceImg: new Image(612, 612),
      }
    },
    mounted () {
      this.$refs.map.resizePreserveCenter()
      this.sourceImg.setAttribute('crossOrigin', 'anonymous');
      // this.sourceImg.src = 'http://i.imgur.com/9oFUzzo.png'; //1024
      this.sourceImg.src = 'http://i.imgur.com/ZpWwDlT.png'; // 612

      window.addEventListener('resize', this.restoreCenter);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.restoreCenter);
    },
    computed: {
      coords() {
        if (!this.$refs.map || !this.$refs.map.$mapObject) return [];

        const projection = this.$refs.map.$mapObject.getProjection();

        var windowPath = [{
          x: 124.80555725097656,
          y: 199.1128463745117
        }, {
          x: 136.80555725097656,
          y: 111.61284637451172
        }];

        var windowCoords = generatePolyPath(windowPath)
        .map((coord) => {
          return projection.fromPointToLatLng(new google.maps.Point(coord.x, coord.y));
        });

        return windowCoords;
      },
    },
    methods: {
      setCenterPixel(x, y) {
        const projection = this.$refs.map.$mapObject.getProjection();
        const coord = projection.fromPointToLatLng(new google.maps.Point(x, y));

        console.log('setCenter', coord.lat(), coord.lng());
        this.$refs.map.$mapObject.setCenter(coord);
      },

      drawEntries() {
        const projection = this.$refs.map.$mapObject.getProjection();

        this.entries.forEach((entry) => {
          var coords = generatePolyPath(entry.locations)
          .map((coord) => {
            return projection.fromPointToLatLng(new google.maps.Point(coord.x, coord.y));
          });

          var generatedPath = new google.maps.Polyline({
            path: coords,
            geodesic: false,
            strokeColor: entry.color,
            strokeOpacity: 1.0,
            strokeWeight: 3,
          });

          generatedPath.setMap(this.$refs.map.$mapObject);

          google.maps.event.addListener(generatedPath, 'click', (e) => {
            this.$emit('click', entry.id, e);
          });
        });
      },

      restoreCenter() {
        const map = this.$refs.map.$mapObject;
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      },

      handleMapTypeIdChange(mapType) {
        if (mapType === 'brooklyn') {
          this.drawEntries();
        }
      },

      handleMapLoaded() {
        this.$refs.map.resizePreserveCenter()
        this.mapLoaded = true;

        const name = 'brooklyn'

        // Load the custom map
        const sourceImg = this.sourceImg;
        const mapType = new google.maps.ImageMapType({
          getTileUrl: function(rawCoord, zoom) {
            let coord = getNormalizedCoord(rawCoord, zoom);
            return generateTile(name, sourceImg, { width: 256, height: 256 }, coord, zoom);
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 8,
          minZoom: 1,
          radius: 1,
          name: 'Brooklyn'
        });

        this.$refs.map.$mapObject.mapTypes.set(name, mapType);
        this.$refs.map.$mapObject.setMapTypeId(name);
      },
    }
  }
</script>