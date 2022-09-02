import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from './pages/Project/UserManagement/Session';



const PrivateRoute = ({ component: Component, ...rest }) => {
    return getUser() ? <Component /> : <Navigate to={{ pathname: '/login' }} />;

}

export default PrivateRoute;