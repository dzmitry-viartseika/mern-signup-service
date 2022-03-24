import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class WishesService {

  static async sendWishesTextToEmail(email: string, text: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/send-wishes', { email, text });
  }
}
