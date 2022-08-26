// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigBuyer = [ 
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
];

export default navConfigBuyer;
