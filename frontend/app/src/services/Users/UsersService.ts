import { AxiosResponse } from 'axios';
import $api from '../../api/api';
import { IUser } from '../../model/IUser';

export default class UsersService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
