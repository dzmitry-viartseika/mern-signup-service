import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { email, password });
  }

  static async registration(email: string, password: string)
    : Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  static async restorePassword(email: string): Promise<void> {
    return $api.post('/forgot-password', { email });
  }

  static async changePassword(email: string, newPassword: string): Promise<void> {
    return $api.post('/change-password', { email, newPassword });
  }

  static async test(): Promise<void> {
    return $api.get('/getuser');
  }
}
