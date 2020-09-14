import { INavData } from '@coreui/angular';

export const listMenu: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Khai báo doanh nghiệp'
  },
  {
    name: 'Khai khoáng',
    url: '/enterprises/list-enterprises',
    icon: 'icon-book-open'
  },
  {
    name: 'Chế biến, chế tạo',
    url: '/enterprises/list-enterprises',
    icon: 'icon-book-open'
  },
  {
    title: true,
    name: 'Báo cáo'
  },
  {
    name: 'Phát thải KNK ',
    url: '/theme/colors',
    icon: 'icon-chart'
  },
  {
    name: 'Tổng hợp tiêu thụ năng lượng của các lĩnh vực',
    url: '/theme/colors',
    icon: 'icon-chart'
  },
  {
    name: 'Tổng hợp phát thải KNK cho các lĩnh vực',
    url: '/theme/colors',
    icon: 'icon-chart'
  },
];
