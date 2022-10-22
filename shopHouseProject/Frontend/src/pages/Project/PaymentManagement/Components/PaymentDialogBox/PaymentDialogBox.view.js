import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import PaymentForm from './PaymentForm/PaymentForm';

export function PaymentDialogBoxView(props) {

    const {
        open,
        setOpen,
        handleClickOpen,
        handleClose,
        cartData,
        userData,
        total
    } = props

    useEffect(() => {
        console.log("user-Details", userData);
        console.log("cart-Details", cartData);

    }, [userData, cartData])


    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Payment Portal</DialogTitle>
                {/* <Grid container spacing={1}>
                    <Grid item md={12}>
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
                                    {cartData != null ? (
                                        cartData.map((item, index) => {
                                            total = total + parseFloat(item.price);
                                            return (
                                                <>
                                                    <tr class="row-data">
                                                        <td>{item.name} </td>
                                                        <td id="unit">{item.qty}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    ) : (
                                        <h2>"no items in the cart...."</h2>
                                    )}

                                    <tr class="calc-row">
                                        <td colspan="2">Total</td>
                                        <td>Rs.{total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Grid> */}
                <DialogContent>
                    <div style={{ margin: "3%" }}>
                        <PaymentForm />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}