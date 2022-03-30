export default interface IFilterQueryCalendar {
  isVisibleSunday: string | boolean | (string | boolean)[] | undefined;
  isVisibleWeekends: string | boolean | (string | boolean)[] | undefined;
  isVisibleYearSelector: string | boolean | (string | boolean)[] | undefined;
}
