<template>
  <div class="app-analytics">
    Analytics
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
  metaInfo() {
    return {
      title: 'Analytics',
      meta: [
        {
          name: 'description',
          content: 'App Analytics',
        },
      ],
    };
  },
})
export default class Analytics extends Vue {}
</script>

<style scoped lang="scss">

</style>
