import { AxiosResponse } from 'axios';
import $api from '@/api/api';
import IFolder from '@/model/IFolder';
import ISuccessResponse from '@/model/response/ISuccessResponse';
import IFoldersResponse from '@/model/response/IFoldersResponse';
import IFolderResponse from "@/model/response/IFolderResponse";

/**
 * Класс для взаимодействия с папками в системе
 */
export default class FolderService {
  /**
   * Создание новой папки у текущего пользователя
   * @param name - имя папки
   * @param parentFolder - передача айдишку для папки родительской
   * @param userCreatedFolder - текущий пользователь котоорый создает данную папку в системе
   * @param folderType - тип папки
   * @returns Promise, Возвращает информацию о созданной папке
   */
  static async createFolder(name: string, parentFolder: string, userCreatedFolder: string, folderType: number): Promise<AxiosResponse<IFolderResponse>> {
    return $api.post<IFolderResponse>('/folder', { name, parentFolder, userCreatedFolder, folderType });
  }

  /**
   * Возращает список всех папок для текущего пользователя
   * @param id - айдишка пользователя
   * @returns Promise, Возвращает массив папок для текущего пользователя
   */
  static async getAllFilesByUserId(id: string): Promise<AxiosResponse<IFoldersResponse>> {
    return $api.get<IFoldersResponse>(`/folder/all/${id}`);
  }

  /**
   * Удаление выбранной папки по айди
   * @param id - айдишка папки
   * @returns Promise, Возвращает сообщение и статус о успешном/проваленном операции
   */
  static async deleteFolder(id: string): Promise<AxiosResponse<ISuccessResponse>> {
    return $api.delete<ISuccessResponse>(`/folder/${id}`);
  }

  /**
   * Изменение данных выбранной папки
   * @param id - айдишка выбранной папки
   * @param data - измененные поля для обновления
   * @returns Promise, Возвращает обновленную информацию для текущей папки
   */
  static async updateCreatedFolder(id: string, data: Object): Promise<AxiosResponse<ISuccessResponse>> {
    return $api.patch<ISuccessResponse>(`/folder/update/${id}`, { data });
  }
}
