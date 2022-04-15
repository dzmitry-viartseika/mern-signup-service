<template>
  <div class="app-notification">
    <h1 class="app__title">
      Test
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
      title: 'Test',
      meta: [
        {
          name: 'description',
          content: 'App Test',
        },
      ],
    };
  },
})
export default class Test extends Vue {}
</script>

<style scoped lang="scss">

</style>
