<template>
  <div class="app-modal">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ModalTemplate extends Vue {}
</script>

<style scoped lang="scss">

  .app-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;

    &__content {
      display: flex;
    }
  }
</style>
