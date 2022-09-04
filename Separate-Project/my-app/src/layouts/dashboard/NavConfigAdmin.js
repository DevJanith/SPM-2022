// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigAdmin = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user management Admin',
    path: '/dashboard/user-management/admin',
    icon: getIcon('eva:people-fill'),
    children: [
      {
        title: 'List',
        path: '/dashboard/user-management/admin/list'
      },
      {
        title: 'Create',
        path: '/dashboard/user-management/admin/create'
      },
      {
        title: 'Update',
        path: '/dashboard/user-management/admin/update/:id'
      }
    ]
  }, 
  {
    title: 'feedback management Admin',
    path: '/dashboard/feedback-management/admin',
    icon: getIcon('eva:message-square-fill'),
    children: [
      {
        title: 'List',
        path: '/dashboard/feedback-management/admin/list'
      },
      {
        title: 'Create',
        path: '/dashboard/feedback-management/admin/create'
      },
      {
        title: 'Update',
        path: '/dashboard/feedback-management/admin/update/:id'
      }
    ]
  }
];

export default navConfigAdmin;
