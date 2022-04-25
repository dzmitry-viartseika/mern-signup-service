import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import { IAuthResponse } from '@/model/response/IAuthResponse';

/**
 * Класс для взаимодействия с файлами
 */
export default class UploadService {
  /**
   * Загрузка файла на сервер
   * @param file - загружаемый файл
   * @return Promise - возращает промис с информацией о загруженном файле
   */
  static async upload(file: any): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/singleFile', file);
  }

  /**
   * Получение файла по айдишке
   * @param id - айдишка файла
   * @return Promise - возращает промис с текущим файлом
   */
  static async getFileById(id: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>(`/get-file/${id}`);
  }

  /**
   * Удаление файла по айдишке
   * @param id - айдишка файла
   * @return Promise - возращает промис с информацией о проведенной операции
   */
  static async deleteFile(id: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.delete<any>(`/delete-file/${id}`);
  }
}
