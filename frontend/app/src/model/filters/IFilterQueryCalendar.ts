export default interface IFilterQueryCalendar {
  isVisibleSunday: string | boolean | (string | boolean)[] | null;
  isVisibleWeekends: string | boolean | (string | boolean)[] | null;
  isVisibleYearSelector: string | boolean | (string | boolean)[] | null;
}
