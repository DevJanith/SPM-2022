import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Project/UserManagement/Login';
import NotFound from './pages/Page404';
import ItemManagement from "./pages/Project/ItemManagement/ItemManagement";
import PaymentManagement from "./pages/Project/PaymentManagement/PaymentManagement";
import ShopManagement from "./pages/Project/ShopManagement/ShopManagement";
import UserManagement from "./pages/Project/UserManagement/UserManagement";
import Register from './pages/Project/UserManagement/Register';
import PrivateRoute from './PrivateRoutes';

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'payment-management', element: <PaymentManagement /> },
        { path: 'shop-management', element: <ShopManagement /> },
        { path: 'item-management', element: <ItemManagement /> },
        { path: 'user-management', element: <UserManagement /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
