import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import IWorkingDayResponse from '@/model/response/IWorkingDayResponse';

export default class WorkingDaysService {
  static async getWorkingDaysList(): Promise<AxiosResponse<IWorkingDayResponse>> {
    return $api.get<IWorkingDayResponse>('/working-days');
  }

  static async changeWorkingDate(date: IWorkingDayResponse): Promise<AxiosResponse<IWorkingDayResponse>> {
    return $api.patch<IWorkingDayResponse>('/changed-working-days', { date });
  }
}
