export interface IAsideItem {
  id: number;
  name: string;
  route: string;
  icon: string;
  path: string;
  children?: IAsideItem[];
}
