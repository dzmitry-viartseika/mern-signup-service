import { IAsideItem } from '../model/constants/IAsideItem';

const asideMenuItems: IAsideItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    route: '/crm/dashboard',
    icon: 'House',
  },
  {
    id: 2,
    name: 'Settings',
    route: '/crm/settings',
    icon: 'Person',
  },
  {
    id: 3,
    name: 'Calendar',
    route: '/crm/calendar-working-days',
    icon: 'Calendar',
  },
  {
    id: 4,
    name: 'Notification',
    route: '/crm/notifications',
    icon: 'Bell',
  },
  {
    id: 5,
    name: 'Analytics',
    route: '/crm/analytics',
    icon: 'Chart',
  },
];

export default asideMenuItems;
