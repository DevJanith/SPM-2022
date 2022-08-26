import { Navigate, Route, Routes } from 'react-router-dom';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import ItemManagement from './pages/Project/ItemManagement/ItemManagement';
import PaymentManagement from './pages/Project/PaymentManagement/PaymentManagement';
import ShopManagement from './pages/Project/ShopManagement/ShopManagement';
import TransactionManagement from './pages/Project/TransactionManagment/TransactionManagment';
import Login from './pages/Project/UserManagement/Login';
import Register from './pages/Project/UserManagement/Register';
import UserManagement from './pages/Project/UserManagement/UserManagement';
import PrivateRoute from './PrivateRoutes';
import ThemeProvider from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {/* <Router />  */}
      <Routes>
        <Route path='/' element={<LogoOnlyLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path="dashboard" element={<PrivateRoute component={DashboardLayout} />} >
            <Route path='app' element={<DashboardApp />} />
            <Route path='user-management' element={<UserManagement />} />
            <Route path='item-management' element={<ItemManagement />} />
            <Route path='shop-management' element={<ShopManagement />} />
            <Route path='payment-management' element={<PaymentManagement />} />
            <Route path='transaction-management' element={<TransactionManagement />} />
            {/* <Route path='blog' element={<Blog />} /> */}
            <Route path='*' element={<Navigate to='/404' />} />
          </Route>
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
