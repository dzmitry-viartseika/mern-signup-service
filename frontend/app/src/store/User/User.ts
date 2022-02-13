import { IUser } from '@/model/IUser';
import {
  VuexModule, Module, Mutation,
} from 'vuex-module-decorators';

@Module({ namespaced: true })
class User extends VuexModule {
  public user: IUser | null = null;

  @Mutation
  public setUser(user: IUser): void {
    this.user = user;
  }
}

export default User;
