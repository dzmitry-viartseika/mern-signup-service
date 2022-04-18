import { IAsideItem } from '../model/aside/IAsideItem';

const asideMenuItems: IAsideItem[] = [
  {
    id: 1,
    path: '/crm/dashboard',
    name: 'asideMenu.dashboard',
    route: 'Dashboard',
    icon: 'House',
  },
  {
    id: 2,
    path: '/crm/settings',
    name: 'asideMenu.settings',
    route: 'Settings',
    icon: 'Person',
  },
  {
    id: 3,
    path: '/crm/calendar',
    name: 'asideMenu.calendar',
    route: 'Calendar',
    icon: 'Calendar',
  },
  {
    id: 4,
    path: '/crm/notification',
    name: 'asideMenu.notification',
    route: 'Notification',
    icon: 'Bell',
  },
  {
    id: 5,
    path: '/crm/analytics',
    name: 'asideMenu.analytics',
    route: 'Analytics',
    icon: 'Chart',
  },
  {
    id: 6,
    path: '/crm/files',
    name: 'asideMenu.files',
    route: 'Files',
    icon: 'Folder',
  },
  {
    id: 7,
    path: '/crm/others',
    name: 'asideMenu.others',
    route: 'Others',
    icon: 'Dots',
    children: [
      {
        id: 8,
        path: '/crm/others/test',
        name: 'Тестовый роут',
        route: 'Test',
        icon: 'Chart',
      },
    ],
  },
];

// TODO three-dots icon bootstrap

export default asideMenuItems;
