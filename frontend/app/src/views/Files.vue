<template>
  <div class="app-files">
    <div class="app-files-header">
      <h1 class="app__title">
        Files
      </h1>
      <button
        class="app__btn app__btn--primary"
      >
        Add file
      </button>
      <button
        class="app__btn app__btn--primary"
      >
        Create Folder
      </button>
    </div>
    <div class="app-files-content">

    </div>
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
  .app-files {

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-content {
      margin-top: 20px;
      box-shadow: 0 0 15px rgba(black, .2);
      border-radius: 4px;
      padding: 35px 24px 24px;
      height: calc(100vh - 90px);
      min-height: 309px;
      overflow: auto;
    }
  }
</style>
