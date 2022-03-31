<template>
  <div class="app-calendar">
    <h1 class="app__title">
      {{ $t('calendarPage.pageTitle') }}
    </h1>
    <div class="app-calendar-section">
      <div class="app-calendar-section__settings">
        <checkbox
          id="hide-sunday"
          name="hide-sunday"
          :value.sync="filterQuery.isVisibleSunday"
          :label="$t('calendarPage.hideSunday')"
          @changeCheckBox="changeCheckBox($event)"
        />
        <!--        // TODO fix naming value-->
        <checkbox
          id="hide-weekend"
          name="hide-weekend"
          :value.sync="filterQuery.isVisibleWeekends"
          :label="$t('calendarPage.hideWeekend')"
          @changeCheckBox="changeCheckBox($event)"
        />
        <checkbox
          id="year-selector"
          name="year-selector"
          :value.sync="filterQuery.isVisibleYearSelector"
          :label="$t('calendarPage.showYearSelector')"
          @changeCheckBox="changeCheckBox($event)"
        />
      </div>
      <YearCalendar
        v-model="year.label"
        :lang="$i18n.locale"
        :active-dates.sync="serverStateDays"
        :active-class="'calendar--selected'"
        :show-year-selector="filterQuery.isVisibleYearSelector"
        :hide-sunday="filterQuery.isVisibleSunday"
        :hide-weekend="filterQuery.isVisibleWeekends"
        prefix-class="calendar--selected"
        @toggleDate="toggleDate"
      />
      <div class="app-calendar-section__legend">
        <div class="calendar__day">
          <div class="day work">
            28
          </div>
        </div>
        <div>
          - {{ $t('calendarPage.workingDay') }}
        </div>
      </div>
      <div class="app-calendar-section__legend">
        <div class="calendar__day">
          <div class="day holiday">
            28
          </div>
        </div>
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
import Checkbox from '@/components/Elements/Checkbox.vue';
import { formatDate } from '@/utils/ComponentUtils';
import queryString from 'query-string';
import '@/assets/icons/Eye';
import WorkingDaysService from '@/services/WorkingDays/WorkingDays';
import WeekBasedWorkingCalendarDateInterval from '@/model/WeekBasedWorkingCalendarDateInterval';
import IFilterQueryCalendar from '@/model/filters/IFilterQueryCalendar';
import { DayIntervalType } from '@/model/types/DayIntervalType';
import { AxiosResponse } from 'axios';

const DATE_FORMAT = 'YYYY-MM-DD';
const CALENDAR_SELECTED_CLASS = 'calendar--selected';

interface IActiveDates {
  className: string;
  date: Date;
  selected?: boolean;
}

interface IPrepareDate {
  label: number;
  value: number;
}

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
  year: IPrepareDate | null  = null;
  isVisibleSunday: boolean | undefined = undefined;
  isVisibleWeekends: boolean | undefined = undefined;
  isVisibleYearSelector: boolean | undefined = undefined;
  filterQuery: IFilterQueryCalendar = {} as IFilterQueryCalendar;
  activeDates: IActiveDates[] = [];

  async created(): Promise<any> {
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
    } as IFilterQueryCalendar;
    this.isVisibleWeekends = isVisibleWeekends as boolean | undefined;
    this.isVisibleSunday = isVisibleSunday as boolean | undefined;
    this.isVisibleYearSelector = isVisibleYearSelector as boolean | undefined;
    try {
      const { data } = await WorkingDaysService.getWorkingDaysList() as AxiosResponse;
      const result: IActiveDates[] = data.map((date) => ({
        date: formatDate(new Date(date.calendar), DATE_FORMAT),
        className: CALENDAR_SELECTED_CLASS,
      })) as IActiveDates[];
      this.activeDates = result;
    } catch (e) {
      console.error(e);
    }
  }

  addingParameterToLink(): void {
    this.$router.push({
      /* eslint-disable */
      /* tslint:disable */
      // @ts-ignore
      query: {
        ...this.filterQuery,
      },
    }).catch((e) => {
      console.error(e);
    });
  }

  changeCheckBox(): void {
    this.filterQuery = {
      ...this.filterQuery,
    };
    this.addingParameterToLink();
  }

  async toggleDate(dateInfo: IActiveDates): Promise<any | never> {
    const { date } = dateInfo;
    const changedDate = {
      calendar: new Date(date) as Date,
      intervalType: this.checkDaysForIntervalType(new Date(date)),
    };
    await WorkingDaysService.changeWorkingDate(changedDate);
  }

  checkDaysForIntervalType(dateInfo: Date): string {
    if (WeekBasedWorkingCalendarDateInterval.HOLYDAYS.includes(dateInfo.getDay())) {
      return DayIntervalType.WORKING;
    }

    return DayIntervalType.HOLIDAY;
  }

  get serverStateDays(): IActiveDates[] {
    return this.activeDates;
  }

  set serverStateDays(data: IActiveDates[]) {
    this.activeDates = data;
  }

  private prepareDate(data: number): IPrepareDate {
    return {
      label: data,
      value: data,
    };
  }

  get yearsToSelect(): IPrepareDate[] {
    const firstYearGenerator = new Date().getFullYear() - 2;
    const createdYearsArray = [...Array(5).keys()];
    return createdYearsArray.map((i) => this.prepareDate(i + firstYearGenerator));
  }
}
</script>

<style lang="scss">

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

      .app-checkbox + .app-checkbox {
        margin-left: 10px;
      }
    }
  }
}
</style>
