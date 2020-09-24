import { INavData } from '@coreui/angular';

export const listMenuReport: INavData[] = [
  {
    title: true,
    name: 'Báo cáo'
  },
  {
    name: 'Phát thải KNK ',
    url: '/reports/list-reports',
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
