import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import IWorkingDayResponse from '@/model/response/IWorkingDayResponse';

/**
 * Класс для работы с производственным календарем в системе
 */
export default class WorkingDaysService {
  /**
   * Получение списка всех выходных/праздничных дней
   */
  static async getWorkingDaysList(): Promise<AxiosResponse<IWorkingDayResponse>> {
    return $api.get<IWorkingDayResponse>('/working-days');
  }

  /**
   * Изменить выбранный день на рабочий/выходной
   * @param date - выбранная дата
   * @return Promise - возращает промис с измененной информацией о выбранной дате
   */
  static async changeWorkingDate(date: IWorkingDayResponse): Promise<AxiosResponse<IWorkingDayResponse>> {
    return $api.patch<IWorkingDayResponse>('/changed-working-days', { date });
  }
}
