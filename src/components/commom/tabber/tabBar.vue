<template>
  <div id="app">
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBar'
}
</script>

<style>
  /* 使用flex布局 */
  #tab-bar {
    background-color: #DADADA;
    display: flex;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    /* 阴影 */
    box-shadow: 0px -3px 1px rgba(100, 100, 100, 0.1);
  }
</style>