import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class UploadService {
  static async upload(file: any): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/singleFile', file);
  }

  static async getFileById(id: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>(`/get-file/${id}`);
  }

  static async deleteFile(id: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.delete<any>(`/delete-file/${id}`);
  }
}
