<template>
  <div class="app-analytics">
    <div class="app-analytics-header">
      <h1 class="app__title">
        Analytics
      </h1>
      <button class="app__btn app__btn--primary">filter</button>
    </div>
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

      yAxis: {
        title: {
          text: 'Number of Employees'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
  }
}
</script>

<style scoped lang="scss">
.app-analytics {

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 100%;
  }
}
</style>
