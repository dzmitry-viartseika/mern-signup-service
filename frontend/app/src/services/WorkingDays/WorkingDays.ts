import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class WorkingDaysService {
  static async getWorkingDaysList(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>('/working-days');
  }

  static async changeWorkingDate(date): Promise<AxiosResponse<IAuthResponse>> {
    return $api.patch<IAuthResponse>('/changed-working-days', { date });
  }
}
