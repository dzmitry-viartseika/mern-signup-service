<template>
  <div class="app-notification">
    <h1 class="app__title">
      Files
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
  metaInfo() {
    return {
      title: 'Files',
      meta: [
        {
          name: 'description',
          content: 'App Files',
        },
      ],
    };
  },
})
export default class Files extends Vue {}
</script>

<style scoped lang="scss">

</style>
