// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigClient = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  }, 
  {
    title: 'user management',
    path: '/dashboard/user-management/client',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'List',
        path: '/dashboard/user-management/client/list'
      },
      {
        title: 'Create',
        path: '/dashboard/user-management/client/create'
      },
      {
        title: 'Update',
        path: '/dashboard/user-management/client/update/:id'
      }
    ]
  },
  {
    title: 'feedback management',
    path: '/dashboard/feedback-management/client',
    icon: getIcon('eva:message-square-fill'),
    children: [
      {
        title: 'List',
        path: '/dashboard/feedback-management/client/list'
      },
      {
        title: 'Create',
        path: '/dashboard/feedback-management/client/create'
      },
      {
        title: 'Update',
        path: '/dashboard/feedback-management/client/update/:id'
      }
    ]
  }
];

export default navConfigClient;
