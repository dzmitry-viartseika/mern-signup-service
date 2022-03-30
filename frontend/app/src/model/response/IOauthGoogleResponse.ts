interface IUserGoogle {
  displayName: string;
  emails: any[];
  id: string;
  name: any;
  _raw: any;
  _json: any;
  photos: any[];
  provider: string;
}

export default interface IOauthGoogleResponse {
  message: string;
  user: IUserGoogle;
}
