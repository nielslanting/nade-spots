<style scoped>
  .modal-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal {
    position: relative;
    /*background-color: #34495e;*/
    background-color: #2c3e50;
    margin: 20px;
    padding: 15px;
    height: calc(100% - 40px);
    border-radius: 3px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .modal .close {
    position: absolute;
    top: 10px;
    right: 7px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ecf0f1;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1.8em;
  }

  .modal .close:hover {
    color: #CD9600;
  }
</style>

<template>
  <div class="modal-container" @scroll.stop.prevent>
    <div class="modal" @scroll.stop.prevent>
      <div class="close" @click="$emit('close')">
        <i class="icon ion-close"></i>  
      </div>
      <slot @scroll.stop.prevent></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    mounted () {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy () {
      document.body.style.overflow = 'auto'
    }
  }
</script>
