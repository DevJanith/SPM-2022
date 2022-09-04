import { Route, Routes } from "react-router";
import { FeedbackCreate, FeedbackList, FeedbackUpdate, FeedbackView } from ".";


export function FeedbackClient() {

    return <Routes>
        <Route path={`/create`} element={<FeedbackCreate />} /> 
        <Route path={`/update/:id`} element={<FeedbackUpdate />} /> 
        <Route path={`/list/`} element={<FeedbackList />} /> 
        <Route path={`/view/:id`} element={<FeedbackView />} /> 

    </Routes>
} 