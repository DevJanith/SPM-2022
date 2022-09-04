import { Route, Routes } from "react-router";
import { UserCreate, UserList, UserUpdate, UserView } from ".";


export function UserClient() {

    return <Routes>
        <Route path={`/create`} element={<UserCreate />} />
        <Route path={`/update/:id`} element={<UserUpdate />} />
        <Route path={`/list/`} element={<UserList />} />
        <Route path={`/view/:id`} element={<UserView />} />

    </Routes>
} 