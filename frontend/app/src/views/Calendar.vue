<template>
  <div class="app-calendar">
    <h1 class="app__title">
      {{ $t('calendarPage.pageTitle') }}
    </h1>
    <div class="app-calendar-section">
      <div class="app-calendar-section__settings">
        <checkbox
          name="hide-sunday"
          :value.sync="filterQuery.isVisibleSunday"
          :label="$t('calendarPage.hideSunday')"
          @changeCheckBox="changeCheckBox($event)"
          id="hide-sunday"
        />
<!--        // TODO fix naming value-->
        <checkbox
          name="hide-weekend"
          :value.sync="filterQuery.isVisibleWeekends"
          :label="$t('calendarPage.hideWeekend')"
          @changeCheckBox="changeCheckBox($event)"
          id="hide-weekend"
        />
        <checkbox
          name="year-selector"
          :value.sync="filterQuery.isVisibleYearSelector"
          :label="$t('calendarPage.showYearSelector')"
          @changeCheckBox="changeCheckBox($event)"
          id="year-selector"
        />
      </div>
      <YearCalendar
        v-model="year.label"
        :lang="$i18n.locale"
        :activeDates.sync="serverStateDays"
        @toggleDate="toggleDate"
        :active-class="'calendar--selected'"
        :show-year-selector="filterQuery.isVisibleYearSelector"
        :hide-sunday="filterQuery.isVisibleSunday"
        :hide-weekend="filterQuery.isVisibleWeekends"
        prefix-class="calendar--selected"
      ></YearCalendar>
      <div class="app-calendar-section__legend">
        <div class="calendar__day"><div class="day work">28</div></div>
        <div>
          - {{ $t('calendarPage.workingDay') }}
        </div>
      </div>
      <div class="app-calendar-section__legend">
        <div class="calendar__day"><div class="day holiday">28</div></div>
        <div>
          - {{ $t('calendarPage.dayOff') }}
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
import WorkingDaysService from "@/services/WorkingDays/WorkingDays";
import WeekBasedWorkingCalendarDateInterval from '@/model/WeekBasedWorkingCalendarDateInterval';

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

  // serverStateDays: any[] = [];

  isVisibleSunday: boolean| null = null;
  isVisibleWeekends: boolean| null = null;
  isVisibleYearSelector: boolean| null = null;

  filterQuery = {};

  activeDates: any[] = [];

  get serverStateDays() {
    return this.activeDates.filter((item) => item.intervalType !== 'working');
  }

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
    const parsed = queryString.parse(location.search, { parseBooleans: true });
    const {
      isVisibleSunday = this.filterQuery.isVisibleSunday,
      isVisibleWeekends = this.filterQuery.isVisibleWeekends,
      isVisibleYearSelector = this.filterQuery.isVisibleYearSelector,
    } = parsed;
    this.filterQuery = {
      isVisibleSunday,
      isVisibleWeekends,
      isVisibleYearSelector,
    };
    this.isVisibleWeekends = isVisibleWeekends;
    this.isVisibleSunday = isVisibleSunday;
    this.isVisibleYearSelector = isVisibleYearSelector;
    try {
      const response = await WorkingDaysService.getWorkingDaysList();
      this.activeDates = response.data.map((date) => {
        return {
          date: date.calendar,
          id: date._id,
          intervalType: date.intervalType,
        };
      }).filter((item) => item.intervalType !== 'working');
    } catch (e) {
      console.error(e);
    }
    // http://localhost:8080/crm/calendar-working-days?isVisibleYearSelector=true
    //?ownersCompanyAmount=1&director=ME&activityAreas=HOTELS&activityAreas=FRANCHISE
    //http://localhost:8080/crm/calendar-working-days?isVisibleYearSelector=true&isVisibleWeekends=true&isVisibleSunday=true
  }

  addingParameterToLink() {
    this.$router.push({
      query: {
        ...this.filterQuery,
      },
    }).catch(() => {});
  }

  checkDaysForIntervalType(dateInfo): string {
    const date = new Date(dateInfo.date);

    if (WeekBasedWorkingCalendarDateInterval.HOLYDAYS.includes(date.getDay())){
      return 'working';
    }

    return 'holiday';
  }

  changeCheckBox() {
    this.filterQuery = {
      ...this.filterQuery,
    };
    this.addingParameterToLink();
  }

  async createWeekBasedWorkingCalendarDate(dateInfo) {
    try {
      const { date } = dateInfo;
      console.log('date', date);
      const response = await WorkingDaysService.changeWorkingDate(date);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async toggleDate (dateInfo): void {
    console.log(dateInfo);  // { date: '2010-10-23', selected: true }

    // const existedDayChangeForState = this.serverStateDays.find((item) => formatDate(item.date(), DATE_FORMAT) == dateInfo.date);
    //
    // if (existedDayChangeForState) {
    //   existedDayChangeForState.uow.remove(existedDayChangeForState);
    //   await this.uow.saveAsync();
    //   return this.serverStateDays = this.uow.all() as WeekBasedWorkingCalendarDateInterval[]; // !!!
    // }
    const response = await this.createWeekBasedWorkingCalendarDate(dateInfo);
    console.log('response', response);
    const currentDateIndex = this.activeDates.findIndex((item) => item.id === response.data._id);
    console.log('currentDateIndex', currentDateIndex);
    if (currentDateIndex === -1) {
      console.log('=-11111')
      this.activeDates.push(response.data);
      console.log('this.activeDates', this.activeDates);
    } else {
      this.activeDates.splice(currentDateIndex, 1, response.data);
    }
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

    &__settings {
      display: flex;
      margin-bottom: 20px;
      //padding: 0 10px;
      .app-checkbox + .app-checkbox {
        margin-left: 10px;
      }
    }
  }
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

  //.day.calendar--selected {
  //  background-color: ghostwhite !important;
  //  border-radius: 100% !important;
  //  color: white !important;
  //}
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
