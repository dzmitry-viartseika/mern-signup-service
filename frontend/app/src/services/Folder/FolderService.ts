import { AxiosResponse } from 'axios';
import $api from '@/api/api';
// import { IAuthResponse } from '@/model/response/IAuthResponse';

export default class FolderService {
  static async createFolder(name: string, parentFolder: string, userCreatedFolder: string, folderType: number): Promise<AxiosResponse<any>> {
    return $api.post<any>('/folder', { name, parentFolder, userCreatedFolder, folderType });
  }

  static async getAllFilesByUserId(id: string): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/folder/all/${id}`);
  }

  static async deleteFolder(id: string): Promise<AxiosResponse<any>> {
    return $api.delete<any>(`/folder/${id}`);
  }

  static async updateCreatedFolder(id: string, data: any): Promise<AxiosResponse<any>> {
    return $api.patch<any>(`/folder/update/${id}`, { data });
  }
}
