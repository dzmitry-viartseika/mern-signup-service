import i18n from '@/i18n';
import { IAsideItem } from '../model/aside/IAsideItem';

const asideMenuItems: IAsideItem[] = [
  {
    id: 1,
    name: i18n.t('asideMenu.dashboard') as string,
    route: '/crm/dashboard',
    icon: 'House',
  },
  {
    id: 2,
    name: i18n.t('asideMenu.settings') as string,
    route: '/crm/settings',
    icon: 'Person',
  },
  {
    id: 3,
    name: i18n.t('asideMenu.calendar') as string,
    route: '/crm/calendar-working-days',
    icon: 'Calendar',
  },
  {
    id: 4,
    name: i18n.t('asideMenu.notification') as string,
    route: '/crm/notifications',
    icon: 'Bell',
  },
  {
    id: 5,
    name: i18n.t('asideMenu.analytics') as string,
    route: '/crm/analytics',
    icon: 'Chart',
  },
];

export default asideMenuItems;
