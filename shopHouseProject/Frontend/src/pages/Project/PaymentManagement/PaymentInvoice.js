// ES2015 module syntax
import { LoadingButton } from '@mui/lab';
import { Grid, Link, Typography } from '@mui/material';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import React from 'react';
import customDate from '../../../utils/CustomDate';
import "./PaymentInvoice.css";

const PaymentInvoice = (props) => {

    const {
        cartData,
        setCartData,
        userData,
        setUserData,
        value,
        setValue
    } = props

    console.log(userData)

    var total = 0

    const pdfExportComponent = React.useRef(null);

    const exportPDFWithMethod = () => {
        let element = document.querySelector('.k-grid') || document.body;
        savePDF(element, {
            paperSize: 'A4'
        });
    };
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    console.log(value)

    const handleValue = () => {
        setValue(1)
    }

    return (
        <>
            <div class="invoice-card">
                <PDFExport ref={pdfExportComponent}
                    paperSize="A4"
                    title='DS_products Store Invoice'
                    scale={0.6}
                    margin="2cm"
                >
                    <div>
                        <h1>DS Product Store Invoice</h1>
                    </div>
                    <div class="invoice-title" >
                        <div id="main-title">
                            <h4>INVOICE</h4>
                            <span>{`Inv-${Math.floor(1000 + Math.random() * 9000)}`}</span>
                        </div>

                        <span id="date">{customDate()}</span>
                    </div>

                    <div style={{ margin: "20px 0 20px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ flex: "4" }}>
                            <div>
                                <h3>DS_Product Store</h3>
                                <div  >
                                    <span style={{ fontSize: "14px" }}>Email : </span>
                                    <span style={{ fontSize: "12px" }}>ds_productStore@gmail.com</span>
                                </div>
                                <div >
                                    <span style={{ fontSize: "14px" }}>Phone : </span>
                                    <span style={{ fontSize: "12px" }}>+94 768 523 525</span>
                                </div>
                                <div  >
                                    <span style={{ fontSize: "14px" }}>Address : </span>
                                    <span style={{ fontSize: "12px" }}>
                                        Elton st. 234, Garden Yd. NewYork
                                    </span>
                                </div>
                                <div >
                                    <span style={{ fontSize: "14px" }}>Country : </span>
                                    <span style={{ fontSize: "12px" }}>Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: "1" }}>
                            <div>
                                <h4 >Buyer Details</h4>
                                <div >
                                    <span style={{ fontSize: "14px" }}>Name : </span>
                                    <span style={{ fontSize: "12px" }}>{userData != null ? userData.result.name : "no user data"}</span>
                                </div>
                                <div  >
                                    <span style={{ fontSize: "14px" }}>Email : </span>
                                    <span style={{ fontSize: "12px" }}>{userData != null ? userData.result.email : "no user data"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="invoice-details">
                        <table class="invoice-table">
                            <thead>
                                <tr>
                                    <td>PRODUCT</td>
                                    <td>UNIT</td>
                                    <td>PRICE</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cartData != null ? cartData.map((item, index) => {
                                    total = total + parseFloat(item.price)
                                    return (
                                        <>
                                            <tr class="row-data">
                                                <td>{item.name} </td>
                                                <td id="unit">{item.qty}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        </>

                                    )
                                }) : <h2>"no items in the cart...."</h2>
                                }

                                <tr class="calc-row">
                                    <td colspan="2">Total</td>
                                    <td>Rs.{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="invoice-footer">
                        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                            I agree to DS_Product Store&nbsp;
                            <Link underline="always" color="text.primary" href="#">
                                Terms of Service ,
                            </Link>
                            {''}and , {''}
                            <Link underline="always" color="text.primary" href="#">
                                Privacy Policy
                            </Link>
                            .
                        </Typography>
                    </div>
                </PDFExport>
            </div>
            <div class="invoice-footer" style={{ marginTop: "20px" }}>
                <LoadingButton style={{ marginRight: "2%" }} fullWidth size="small" type="button" onClick={exportPDFWithComponent} variant="contained">
                    Generate a PDF
                </LoadingButton>
                <LoadingButton size="small" fullWidth type="button" variant="contained" onClick={handleValue}>
                    Proceed to Payment
                </LoadingButton>
            </div>
        </>
    )
}

export default PaymentInvoice