<template>
  <div class="app-notification">
    <h1 class="app__title">
      Others
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
      title: 'Others',
      meta: [
        {
          name: 'description',
          content: 'App Others',
        },
      ],
    };
  },
})
export default class Others extends Vue {}
</script>

<style scoped lang="scss">

</style>
