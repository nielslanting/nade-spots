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
    background-color: #34495e;
    margin: 20px;
    padding: 20px;
    height: calc(100% - 40px);
    border-radius: 3px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .modal .close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #7f8c8d;
    border-radius: 3px;
    cursor: pointer;
  }

  .modal .close:hover {
    background-color: #CD9600;
  }
</style>

<template>
  <div class="modal-container" @scroll.stop.prevent>
    <div class="modal" @scroll.stop.prevent>
      <div class="close" @click="$emit('close')">X</div>
      <slot @scroll.stop.prevent></slot>
    </div>
  </div>
</template>
