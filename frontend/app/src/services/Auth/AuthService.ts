import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

/**
 * Класс для создания нового пользователя и взаимодействия в системе.
 */
export default class AuthService {
  /**
   * Авторизация пользователя для входа в систему.
   * @param email - почта нового пользователя
   * @param password - пароль нового пользователя
   * @returns промис, Возвращает екущего пользователя
   */
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { email, password });
  }

  /**
   * Создание нового пользователя для входа в систему.
   * @param email - почта нового пользователя
   * @param password - пароль нового пользователя
   */
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
