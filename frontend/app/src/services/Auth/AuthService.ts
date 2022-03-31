import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { email, password });
  }

  static async registration(email: string, password: string):
  Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  static async restorePassword(email: string): Promise<AxiosResponse<void>> {
    return $api.post<void>('/forgot-password', { email });
  }

  static async changePassword(email: string, newPassword: string): Promise<AxiosResponse<void>> {
    return $api.post<void>('/change-password', { email, newPassword });
  }
}
