<template>
  <div class="app-calendar">
    Calendar
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
  metaInfo() {
    return {
      title: 'Calendar',
      meta: [
        {
          name: 'description',
          content: 'App Calendar',
        },
      ],
    };
  },
})
export default class Calendar extends Vue {}
</script>

<style scoped lang="scss">

</style>
