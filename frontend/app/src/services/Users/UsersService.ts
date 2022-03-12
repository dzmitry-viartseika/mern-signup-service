import { AxiosResponse } from 'axios';
import $api from '../../api/api';
import { IUser } from '../../model/IUser';

export default class UsersService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static updateUser(email: string, updatedUser): Promise<AxiosResponse<IUser>> {
    console.log('email', email);
    console.log('updatedUser', updatedUser);
    return $api.patch<IUser>('/update-user', { email, updatedUser });
  }

  static getCurrentUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/me');
  }
}
