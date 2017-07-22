<style scoped>
  .map {
    width: 100%;
    padding-bottom: 100%
  } 
</style>

<template>
  <div>
    <gmap-map
      ref="map"
      class="map"
      :center="{lat:0, lng:0}"
      :streetViewControl="false"
      :options="{streetViewControl: false}"
      :zoom="0"
    ></gmap-map>

    <button @click="handleClick">
      Load vustom map type 
    </button>
  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    name: 'Map',
    data () {
      return {
        mapTypeId: 'Terrain',
        sourceImg: new Image(493, 612) 
      }
    },
    mounted () {
      this.$refs.map.resizePreserveCenter()
      this.sourceImg.setAttribute('crossOrigin', 'anonymous');
      this.sourceImg.src = 'http://i.imgur.com/mNLIm79.png'
    },
    methods: {
      handleClick() {

        const sourceImg = this.sourceImg;

        // Normalizes the coords that tiles repeat across the x axis (horizontally)
        // like the standard Google map tiles.
        function getNormalizedCoord(coord, zoom) {
          var y = coord.y;
          var x = coord.x;

          // tile range in one direction range is dependent on zoom level
          // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
          var tileRange = 1 << zoom;

          // don't repeat across y-axis (vertically)
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

            console.log('%2', canvas, ctx);
            const dataUrl = canvas.toDataURL();
            this.cache[id] = dataUrl;
            return dataUrl;
          },
          tileSize: new google.maps.Size(493, 612),
          maxZoom: 4,
          minZoom: 0,
          radius: 1,
          backgroundColor: '#000',
          name: 'Brooklyn'
        });

        this.$refs.map.$mapObject.mapTypes.set('brooklyn', moonMapType);
        this.$refs.map.$mapObject.setMapTypeId('brooklyn');
      }
    }
  }
</script>
