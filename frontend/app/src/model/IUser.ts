export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  avatar?: string | ArrayBuffer;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
