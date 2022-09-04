import { Route, Routes } from "react-router";
import { FeedbackAdmin } from "./Admin/FeedbackAdmin";
import { FeedbackClient } from "./Client/FeedbackClient";


export function FeedBackManagement() {

    return <Routes>
        <Route path={`/admin/*`} element={<FeedbackAdmin />} />  
        <Route path={`/client/*`} element={<FeedbackClient />} />  

    </Routes>
} 