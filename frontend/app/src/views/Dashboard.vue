<template>
  <div class="app-notification">
    <h1 class="app__title">
      Dashboard
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
      title: 'Dashboard',
      meta: [
        {
          name: 'description',
          content: 'App Dashboard',
        },
      ],
    };
  },
})
export default class Dashboard extends Vue {}
</script>

<style scoped lang="scss">

</style>
