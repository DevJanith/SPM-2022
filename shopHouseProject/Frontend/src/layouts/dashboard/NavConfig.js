// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user management',
    path: '/dashboard/user-management',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'item management',
    path: '/dashboard/item-management',
    icon: getIcon('eva:activity-fill'),
  },
  {
    title: 'Product Approve management',
    path: '/dashboard/product-approve-management',
    icon: getIcon('icon-park-outline:correct'),
  },
  {
    title: 'shop management',
    path: '/dashboard/shop-management',
    icon: getIcon('eva:shopping-cart-fill'),
  },
  {
    title: 'payment management',
    path: '/dashboard/payment-management',
    icon: getIcon('eva:paper-plane-fill'),
  },
  {
    title: 'transaction management',
    path: '/dashboard/transaction-management',
    icon: getIcon('eva:paper-plane-fill'),
  },
  // {
  //   title: 'tutorial management',
  //   path: '/dashboard/tutorial-management',
  //   icon: getIcon('eva:book-fill'),
  // },
  {
    title: "feedback",
    path: "/dashboard/feedback",
    icon: getIcon("eva:message-circle-outline"),
  },
  {
    title: "feedback management",
    path: "/dashboard/feedback-management",
    icon: getIcon("eva:message-circle-outline"),
  },
];

export default navConfig;
