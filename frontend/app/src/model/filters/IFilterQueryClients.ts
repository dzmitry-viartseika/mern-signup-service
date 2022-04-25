export default interface IFilterQueryClients {
  role: string | boolean | (string | boolean)[] | undefined;
  page: number;
  limit: number;
}
