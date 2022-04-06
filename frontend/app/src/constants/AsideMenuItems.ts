import { IAsideItem } from '../model/aside/IAsideItem';

const asideMenuItems: IAsideItem[] = [
  {
    id: 1,
    name: 'asideMenu.dashboard',
    route: '/crm/dashboard',
    icon: 'House',
  },
  {
    id: 2,
    name: 'asideMenu.settings',
    route: '/crm/settings',
    icon: 'Person',
  },
  {
    id: 3,
    name: 'asideMenu.calendar',
    route: '/crm/calendar-working-days',
    icon: 'Calendar',
  },
  {
    id: 4,
    name: 'asideMenu.notification',
    route: '/crm/notifications',
    icon: 'Bell',
  },
  {
    id: 5,
    name: 'asideMenu.analytics',
    route: '/crm/analytics',
    icon: 'Chart',
    children: [
      {
        id: 6,
        name: 'TEST',
        route: '/crm/test',
        icon: 'Chart',
      },
      {
        id: 7,
        name: 'TEST',
        route: '/crm/test',
        icon: 'Chart',
      },
      {
        id: 8,
        name: 'TEST',
        route: '/crm/test',
        icon: 'Chart',
      },
    ],
  },
];

export default asideMenuItems;
