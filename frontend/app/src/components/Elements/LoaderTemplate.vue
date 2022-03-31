<template>
  <div class="app-loader">
    <div />
    <div />
    <div />
    <div />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class LoaderTemplate extends Vue {}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.app-loader {
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  z-index: 2;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid $color-dodger-blue;
    border-radius: 50%;
    animation: app-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $color-dodger-blue transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes app-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
