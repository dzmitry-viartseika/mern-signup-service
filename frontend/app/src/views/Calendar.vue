<template>
  <div class="app-calendar">
    <h1 class="app__title">
      {{ $t('calendarPage.pageTitle') }}
    </h1>
    <div class="app-calendar-section">
      <div class="app-calendar-section__settings">
        <checkbox
          name="hide-sunday"
          :value="isVisibleSunday"
          :label="$t('calendarPage.hideSunday')"
          v-model="isVisibleSunday"
          id="hide-sunday"
        />
        <checkbox
          name="hide-weekend"
          :value="isVisibleWeekends"
          :label="$t('calendarPage.hideWeekend')"
          v-model="isVisibleWeekends"
          id="hide-weekend"
        />
        isVisibleYearSelector={{ isVisibleYearSelector }}
        <checkbox
          name="year-selector"
          :value="isVisibleYearSelector"
          :label="$t('calendarPage.showYearSelector')"
          v-model="isVisibleYearSelector"
          id="year-selector"
        />
      </div>
      <YearCalendar
        v-model="year.label"
        :lang="$i18n.locale"
        :active-dates.sync="activeDates"
        @toggleDate="toggleDate"
        :active-class="'calendar--selected'"
        :show-year-selector="isVisibleYearSelector"
        :hide-sunday="isVisibleSunday"
        :hide-weekend="isVisibleWeekends"
      ></YearCalendar>
      <div class="app-calendar-section__legend">
        <div class="calendar__day"><div class="day work">28</div></div>
        <div>
          - будний день
        </div>
      </div>
      <div class="app-calendar-section__legend">
        <div class="calendar__day"><div class="day holiday">28</div></div>
        <div>
          - выходной день
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import YearCalendar from 'vue-material-year-calendar';
import IItemDropdown from '@/model/IItemDropdown';
import Checkbox from '@/components/Elements/Checkbox.vue';
import { formatDate } from '@/utils/ComponentUtils';
import sort from 'fast-sort';
import queryString from 'query-string';
import '@/assets/icons/Eye';

const DATE_FORMAT = 'YYYY-MM-DD';

@Component({
  components: {
    YearCalendar,
    Checkbox,
  },
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
  year: IItemDropdown | null = null;

  activeClass = 'red';

  serverStateDays: any[] = [];

  isVisibleSunday = false;
  isVisibleWeekends = false;
  isVisibleYearSelector = false;

  filterQuery = {};

  activeDates = [
    { date: '2022-01-01' },
    { date: '2022-02-14' },
    { date: '2022-02-15' },
    { date: '2022-02-16' }
  ]

  // TODO 4 backend on 2022 year
  // "2022-01-01",
  // "2022-01-02",
  // "2022-01-03",
  // "2022-01-04",
  // "2022-01-05",
  // "2022-01-06",
  // "2022-01-07",
  // "2022-01-08",
  // "2022-01-09",
  // "2022-01-15",
  // "2022-01-16",
  // "2022-01-22",
  // "2022-01-23",
  // "2022-01-29",
  // "2022-01-30",
  // "2022-02-05",
  // "2022-02-06",
  // "2022-02-12",
  // "2022-02-13",
  // "2022-02-19",
  // "2022-02-20",
  // "2022-02-23",
  // "2022-02-26",
  // "2022-02-27",
  // "2022-03-06",
  // "2022-03-07",
  // "2022-03-08",
  // "2022-03-12",
  // "2022-03-13",
  // "2022-03-19",
  // "2022-03-20",
  // "2022-03-26",
  // "2022-03-27",
  // "2022-04-02",
  // "2022-04-03",
  // "2022-04-09",
  // "2022-04-10",
  // "2022-04-16",
  // "2022-04-17",
  // "2022-04-23",
  // "2022-04-24",
  // "2022-04-30",
  // "2022-05-01",
  // "2022-05-02",
  // "2022-05-03",
  // "2022-05-07",
  // "2022-05-08",
  // "2022-05-09",
  // "2022-05-10",
  // "2022-05-14",
  // "2022-05-15",
  // "2022-05-21",
  // "2022-05-22",
  // "2022-05-28",
  // "2022-05-29",
  // "2022-06-04",
  // "2022-06-05",
  // "2022-06-11",
  // "2022-06-12",
  // "2022-06-13",
  // "2022-06-18",
  // "2022-06-19",
  // "2022-06-25",
  // "2022-06-26",
  // "2022-07-02",
  // "2022-07-03",
  // "2022-07-09",
  // "2022-07-10",
  // "2022-07-16",
  // "2022-07-17",
  // "2022-07-23",
  // "2022-07-24",
  // "2022-07-30",
  // "2022-07-31",
  // "2022-08-06",
  // "2022-08-07",
  // "2022-08-13",
  // "2022-08-14",
  // "2022-08-20",
  // "2022-08-21",
  // "2022-08-27",
  // "2022-08-28",
  // "2022-09-03",
  // "2022-09-04",
  // "2022-09-10",
  // "2022-09-11",
  // "2022-09-17",
  // "2022-09-18",
  // "2022-09-24",
  // "2022-09-25",
  // "2022-10-01",
  // "2022-10-02",
  // "2022-10-08",
  // "2022-10-09",
  // "2022-10-15",
  // "2022-10-16",
  // "2022-10-22",
  // "2022-10-23",
  // "2022-10-29",
  // "2022-10-30",
  // "2022-11-04",
  // "2022-11-05",
  // "2022-11-06",
  // "2022-11-12",
  // "2022-11-13",
  // "2022-11-19",
  // "2022-11-20",
  // "2022-11-26",
  // "2022-11-27",
  // "2022-12-03",
  // "2022-12-04",
  // "2022-12-10",
  // "2022-12-11",
  // "2022-12-17",
  // "2022-12-18",
  // "2022-12-24",
  // "2022-12-25",
  // "2022-12-31"

  private prepareDate(date) {
    return { label: date, value: date };
  }

  // get activeDates (): string[] {
  //   return this.serverStateDays.map((data) => formatDate(data.date(), DATE_FORMAT));
  // }

  get yearsToSelect(): IItemDropdown[] {
    const firstYearGenerator = new Date().getFullYear() - 2;
    const createdYearsArray = [...Array(5).keys()];
    return createdYearsArray.map((i) => this.prepareDate(i + firstYearGenerator)) as IItemDropdown[];
  }

  async created() {
    this.year = this.yearsToSelect[2];
    const { location } = window;
    const parsed = queryString.parse(location.search);
    console.log(parsed);
    this.isVisibleSunday = !!parsed.isVisibleSunday;
    this.isVisibleWeekends = !!parsed.isVisibleWeekends;
    this.isVisibleYearSelector = !!parsed.isVisibleYearSelector;
    console.log('this.isVisibleWeekends', this.isVisibleYearSelector);
    // http://localhost:8080/crm/calendar-working-days?isVisibleYearSelector=true
  }

  addingParameterToLink() {
    this.$router.push({
      query: {
        ...this.filterQuery,
      },
    }).catch(() => {});
  }

  async createWeekBasedWorkingCalendarDate() {
    // API
    const response = { date: '2022-02-16' };
    return response;
  }

  async toggleDate (dateInfo): void {
    console.log(dateInfo);  // { date: '2010-10-23', selected: true }
    this.serverStateDays.push(await this.createWeekBasedWorkingCalendarDate(dateInfo));
  }
}
</script>

<style lang="scss">

//.container__year {
//  margin: 0 10px !important;
//}

.app-calendar {


  &-section {
    padding-top: 20px;

    &__legend {
      display: flex;
      margin-bottom: 2px;

      .calendar__day {
        margin-right: 3px;
      }
    }

    //&__settings {
    //  padding: 0 10px;
    //}
  }
}
.red {
  background-color: red;
  color: white;
}

.blue {
  background-color: blue;
  color: white;
}

//.vue-calendar__container {
//  background-color: #FCFCFC!important;
//  box-shadow: none!important;
//
//  & .container__months {
//    padding-left: 0!important;
//    padding-right: 0!important;
//  }
//}
//
.calendar {
  box-shadow: none!important;
}
//.calendar--active {
//  background: #695CFE;
//}


.vue-calendar__container {
  border-radius: 0 !important;
  background-color: #FCFCFC!important;
  box-shadow: none!important;
}

.vue-calendar__container {
  background-color: #FCFCFC!important;
  box-shadow: none!important;

  & .container__months {
    padding-left: 0!important;
    padding-right: 0!important;
  }
}

.vue-calendar__container .container__year .year__chooser {
  transition: all .15s ease-in;
}

.vue-calendar__container .container__year .year__chooser:nth-child(3) {
  box-shadow: inset 0 -3px #695CFE !important;
}

.vue-calendar__container .container__months {
  //position: relative;
  //left: -6px;
}

.calendar {
  &__title {
    border-bottom: none !important;
  }

  &__day--otherMonth {
    display: none !important;
  }

  .day {
    background-color: ghostwhite !important;
    border-radius: 100% !important;
    color: black !important;
  }

  &:hover {
    transform: scale(1) !important;
    box-shadow: none !important;
  }

  & .day.calendar--selected {
    background-color: #695CFE !important;
    color: white !important;
    border-radius: 100% !important;
    font-size: 12px !important;
  }
}

.calendar__day:nth-of-type(7n), .calendar__day:nth-of-type(7n-1) {
  .day {
    background-color: #695CFE!important;
    color: white !important;
    border-radius: 100% !important;
    font-size: 12px !important;
  }

  .day.calendar--selected {
    background-color: ghostwhite !important;
    border-radius: 100% !important;
    color: white !important;
  }
}

.vue-calendar__container .container__year .year__chooser:hover {
  background-color: #695CFE!important;
  color: white!important;
}

.calendar__day {

  & .holiday {
    font-size:12px;
    padding: 3px;
    border-radius: 100%;
    background-color: #695CFE !important;
    color: #fff !important;
  }
  & .work {
    font-size:12px;
    padding: 3px;
    background-color: ghostwhite;
  }
}
</style>
