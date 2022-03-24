<template>
  <div class="app-analytics">
    <h1 class="app__title">
      Analytics
    </h1>
    <div class="app-analytics-section">
      <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Chart } from 'highcharts-vue';
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
  components: {
    highcharts: Chart,
  },
})
export default class Analytics extends Vue {
  get chartOptions() {
    return {
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
      },
      subtitle: {
        text: 'Source: thesolarfoundation.com'
      },
      series: [
        {
          data: [1, 2, 3],
        },
      ],
    };
  }
}
</script>

<style scoped lang="scss">

</style>
