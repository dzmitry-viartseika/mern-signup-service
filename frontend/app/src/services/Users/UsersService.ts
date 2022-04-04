import { AxiosResponse } from 'axios';
import $api from '../../api/api';
import { IUser } from '../../model/IUser';
import { IUsersListResponse } from '@/model/response/IUsersListResponse';
import $api_graphql from '@/api/api_graphql';

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

  static getUsers(): Promise<AxiosResponse<IUsersListResponse[]>> {
    return $api.get('/get-users');
  }

  static getAllUsers({query}) {
    return $api_graphql.post('/graphql', {
      title: "Title of post",
      body: query
    });
  }
}
