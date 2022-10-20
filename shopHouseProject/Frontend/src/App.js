import { Navigate, Route, Routes } from "react-router-dom";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import ScrollToTop from "./components/ScrollToTop";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
// import Blog from "./pages/Blog";
import { FeedBack, FeedBackManagement } from "./pages";
import DashboardApp from "./pages/DashboardApp";
import NotFound from "./pages/Page404";
import { Buyer } from "./pages/Project/Buyer/Buyer";
import ItemManagement from "./pages/Project/ItemManagement/ItemManagement";
import PaymentManagement from "./pages/Project/PaymentManagement/PaymentManagement";
import ProductApproveManagement from "./pages/Project/ProductApproveManagement/ProductManagement";
import ShopManagement from "./pages/Project/ShopManagement/ShopManagement";
import TransactionManagement from "./pages/Project/TransactionManagment/TransactionManagment";
import TutorialManagement from "./pages/Project/TutorialManagement/TutorialManagement";
import Login from "./pages/Project/UserManagement/Login";
import Register from "./pages/Project/UserManagement/Register";
import User from "./pages/Project/UserManagement/User";
import UserApprove from "./pages/Project/UserManagement/UserApprove";
import UserEdit from "./pages/Project/UserManagement/UserEdit";
import UserView from "./pages/Project/UserManagement/UserView";
import PrivateRoute from "./PrivateRoutes";
import ThemeProvider from "./theme";

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {/* <Router />  */}
      <Routes>
        <Route path="/" element={<LogoOnlyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={DashboardLayout} />}
          >
            <Route path="app" element={<DashboardApp />} />
            <Route path="user-management" element={<User />} />
            <Route path="user-management/approve/:id" element={<UserApprove />} />
            <Route path="user-management/view/:id" element={<UserView />} />
            <Route path="user-management/edit/:id" element={<UserEdit />} />
            <Route path="item-management" element={<ItemManagement />} />
            <Route path="product-approve-management" element={<ProductApproveManagement />} />
            <Route path="shop-management" element={<ShopManagement />} />
            <Route path="payment-management" element={<PaymentManagement />} />
            <Route path={`buyer/*`} element={<Buyer />} />
            <Route
              path="transaction-management"
              element={<TransactionManagement />}
            />
            <Route
              path="tutorial-management"
              element={<TutorialManagement />}
            />
            <Route
              path="feedback-management"
              element={<FeedBackManagement />}
            />
            <Route path="feedback" element={<FeedBack />} />

            {/* <Route path='blog' element={<Blog />} /> */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
