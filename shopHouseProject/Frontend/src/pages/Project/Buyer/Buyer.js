import { Route, Routes } from "react-router-dom";
import { AboutUs, ContactUs, Home, Payment, Products } from '.';

export function Buyer() {

    return <Routes>
        <Route path={`/payment/*`} element={<Payment />} />
        <Route path={`/home`} element={<Home />} />
        <Route path={`/products`} element={<Products />} />
        <Route path={`/contact-us`} element={<ContactUs />} />
        <Route path={`/about-us`} element={<AboutUs />} />

    </Routes>
}