import React from "react";
import { Route, Routes } from "react-router-dom";
import { TutorialCreate, TutorialEdit, TutorialList, TutorialView } from ".";
 
export function TutorialManagement() {
    return (
        <Routes>
            <Route path={`/list`} element={<TutorialList />} />
            <Route path={`/create`} element={<TutorialCreate />} />
            <Route path={`/view/:id`} element={<TutorialView />} />
            <Route path={`/edit/:id`} element={<TutorialEdit />} /> 
        </Routes>
    )
}