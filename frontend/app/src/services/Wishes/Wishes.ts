import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

/**
 * Класс для работы с пожеланиями пользователей системы
 */
export default class WishesService {
  /**
   * Отправка пожелания на почту Admin of системы
   * @param email - почта текущего пользователя который отправляет сообщением
   * @param text - сообщение для отправки
   */
  static async sendWishesTextToEmail(email: string, text: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/send-wishes', { email, text });
  }
}
