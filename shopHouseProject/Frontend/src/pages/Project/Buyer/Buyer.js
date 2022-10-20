import { Route, Routes } from "react-router-dom";
import { Payment } from '.'

export function Buyer() {

    return <Routes>
        <Route path={`/payment/*`} element={<Payment />} />
    </Routes>
}