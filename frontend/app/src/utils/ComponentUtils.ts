import moment from 'moment';

export function formatDate(date: Date | null | undefined, mask: string = 'DD.MM.YYYY'): string {
  return date ? moment(date).format(mask) : '';
}

/** Форматирование даты в часовом поясе UTC */
export function formatDateAtUtc(date: Date | null | undefined, mask: string = 'DD.MM.YYYY'): string {
  return date ? moment.utc(date).format(mask) : '';
}

/** Форматирование даты-времени в часовом поясе UTC по стандарту ISO */
export function toISODateTimeAtUtc(date: Date | null | undefined): string {
  return date ? moment.utc(date).toISOString() : '';
}

export function formatTime(date: Date | null | undefined): string {
  return date ? moment(date).format('HH:mm') : '';
}

export function formatDateTime(date: Date | null | undefined, mask: string = 'DD.MM.YYYY в HH:mm'): string {
  return date ? moment(date).format(mask) : '';
}

export function toISODate(date: Date): string {
  return date ? moment(date).format('YYYY-MM-DD') : '';
}

export function getWeekday(date: Date): string {
  return date ? moment(date).format('dddd') : '';
}

export function getMonthDay(date: Date): string {
  return date ? `${moment(date).date()} ${moment(date).format('MMMM')}` : ''
}
