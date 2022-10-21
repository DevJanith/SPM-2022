// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigTrader = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  // {
  //   title: 'user management',
  //   path: '/dashboard/user-management',
  //   icon: getIcon('eva:people-fill'),
  // },
  {
    title: "item management",
    path: "/dashboard/item-management",
    icon: getIcon("eva:activity-fill"),
  },
  {
    title: "transaction management",
    path: "/dashboard/transaction-management",
    icon: getIcon("eva:paper-plane-fill"),
  },
  {
    title: "feedback management",
    path: "/dashboard/feedback-management",
    icon: getIcon("eva:message-circle-outline"),
  },
];

export default navConfigTrader;
