<template>
  <div class="app-calendar">
    <h1>Calendar</h1>
    <YearCalendar
      v-model="year"
      :lang="$i18n.locale"
      :activeDates.sync="activeDates"
      @toggleDate="toggleDate"
      prefixClass="your_customized_wrapper_class"
      :activeClass="activeClass"
    ></YearCalendar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import YearCalendar from 'vue-material-year-calendar'
import '@/assets/icons/Eye';

@Component({
  components: { YearCalendar },
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
export default class Calendar extends Vue {
  year = 2022;

  activeClass = '';

  activeDates = [
    { date: '2022-01-01', className: 'red' },
    { date: '2022-02-14', className: 'red' },
    { date: '2022-02-15', className: 'blue' },
    { date: '2022-02-16', className: 'your_customized_classname' }
  ]

  toggleDate (dateInfo): void {
    console.log(dateInfo)  // { date: '2010-10-23', selected: true }
  }
}
</script>

<style lang="scss">
.red {
  background-color: red;
  color: white;
}

.blue {
  background-color: blue;
  color: white;
}
</style>
