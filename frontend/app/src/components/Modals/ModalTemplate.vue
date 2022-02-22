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

<style scoped>

</style>
