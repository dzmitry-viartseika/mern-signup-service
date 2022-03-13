import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { IUser } from '@/model/IUser';

@Module({ namespaced: true })
class User extends VuexModule {
  public user: IUser = {
    email: '',
    isActivated: false,
    id: '',
    avatar: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  }

  @Mutation
  public setUser(data: IUser): void {
    this.user = data;
  }
}
export default User;
