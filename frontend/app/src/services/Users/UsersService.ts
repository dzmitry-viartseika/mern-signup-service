import { AxiosResponse } from 'axios';
import $api from '../../api/api';
import { IUser } from '../../model/IUser';

export default class UsersService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static updateUser(email: string, updatedUser): Promise<AxiosResponse<IUser>> {
    // TODO обновлять только измененную инфу, а не весь объект
    return $api.patch<IUser>('/update-user', { email, updatedUser });
  }

  static getCurrentUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/me');
  }

  static async success() {
    return $api.get('/');
  }

  static getUsers() {
    return $api.get('/get-users');
  }
}
