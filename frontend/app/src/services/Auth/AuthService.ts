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
   * @returns Promise,  Возвращает текущего пользователя и accessToken
   */
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { email, password });
  }

  /**
   * Создание нового пользователя для входа в систему.
   * @param email - почта нового пользователя
   * @param password - пароль нового пользователя
   * @returns Promise, Возвращает текущего пользователя и accessToken
   */
  static async registration(email: string, password: string):
  Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { email, password });
  }

  /**
   * Выходит с системы и удаляется сессия и куки
   */
  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  /**
   * Восстановление пароля
   * @param email - текущая почта пользователя для восстановления пароля
   */
  static async restorePassword(email: string): Promise<AxiosResponse<void>> {
    return $api.post<void>('/forgot-password', { email });
  }

  /**
   * Изменение текущего пароля
   * @param email - текущая почта пользователя для восстановления пароля
   * @param newPassword - новый пароль
   * @returns Promise, Возвращает текущего пользователя и accessToken
   */
  static async changePassword(email: string, newPassword: string): Promise<AxiosResponse<void>> {
    return $api.post<void>('/change-password', { email, newPassword });
  }
}
