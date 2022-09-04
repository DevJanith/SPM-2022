import { Route, Routes } from "react-router";
import { UserAdmin } from "./Admin/UserAdmin";
import { UserClient } from "./Client/UserClient";


export function UserManagement() {

    return <Routes>
        <Route path={`/admin/*`} element={<UserAdmin />} />
        <Route path={`/client/*`} element={<UserClient />} />

    </Routes>
} 