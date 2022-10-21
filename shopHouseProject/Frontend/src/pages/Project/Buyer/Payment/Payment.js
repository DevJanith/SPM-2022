import { Routes, Route } from "react-router-dom";
import { Invoice, Pay } from ".";

export function Payment() {
    return <Routes>
        <Route path={`/pay`} element={<Pay />} />
        <Route path={`/invoice`} element={<Invoice />} />
    </Routes>
} 