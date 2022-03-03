import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class UploadService {
  static async upload(file: any): Promise<AxiosResponse<IAuthResponse>> {
    console.log('file', file);
    return $api.post<IAuthResponse>('/upload-test', file);
  }
}
