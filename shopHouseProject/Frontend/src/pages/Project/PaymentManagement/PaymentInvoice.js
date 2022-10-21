import { LoadingButton } from "@mui/lab";
import { CardContent, Container, Link, Typography, Card } from "@mui/material";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import React from "react";
import Page from "../../../components/Page";
import customDate from "../../../utils/CustomDate";
import { PaymentDialogBox } from "./Components";
import "./PaymentInvoice.css";

const PaymentInvoice = (props) => {

  const [cartData, setCartData] = React.useState([])
  const [userData, setUserData] = React.useState(null)

  React.useEffect(() => {
    try {
      setCartData(JSON.parse(sessionStorage.getItem("cartData")))
      setUserData(JSON.parse(sessionStorage.getItem("token")))

    } catch (error) {
      console.log(error)
    }
  }, []) 

  var total = 0;

  const pdfExportComponent = React.useRef(null);

  const exportPDFWithMethod = () => {
    let element = document.querySelector(".k-grid") || document.body;
    savePDF(element, {
      paperSize: "A4",
    });
  };
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const dialogBoxProps = {
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    cartData,
    userData,
    total
  }

  return (
    <>
      <Page title="payment-management" >
        <Container>
          <Card>
            <CardContent>
              <div class="invoice-card">
                <PDFExport
                  ref={pdfExportComponent}
                  paperSize="A4"
                  title="DS_products Store Invoice"
                  scale={0.6}
                  margin="2cm"
                  fileName={userData != null ? `invoice-${userData.result.userDetails.userQNumber}` : `invoice`}
                >
                  <div>
                    <h1>Shop House Invoice</h1>
                  </div>
                  <div class="invoice-title">
                    <div id="main-title">
                      <h4>INVOICE</h4>
                      <span>{`Inv-${Math.floor(1000 + Math.random() * 9000)}`}</span>
                    </div>

                    <span id="date">{customDate()}</span>
                  </div>

                  <div
                    style={{
                      margin: "20px 0 20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: "4" }}>
                      <div>
                        <h3>Shop House</h3>
                        <div>
                          <span style={{ fontSize: "14px" }}>Email : </span>
                          <span style={{ fontSize: "12px" }}>
                            shophouse110@gmail.com
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Phone : </span>
                          <span style={{ fontSize: "12px" }}>+94 768 523 525</span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Address : </span>
                          <span style={{ fontSize: "12px" }}>
                            No 50, Temple Rd, Maharagama
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Country : </span>
                          <span style={{ fontSize: "12px" }}>Sri Lanka</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: "2" }}>
                      <div style={{ alignSelf: "flex-end" }}>
                        <h4>Buyer Details</h4>
                        <div>
                          <span style={{ fontSize: "14px" }}>Name : </span>
                          <span style={{ fontSize: "12px" }}>
                            {userData != null ? userData.result.userDetails.userName : "no user data"}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Email : </span>
                          <span style={{ fontSize: "12px" }}>
                            {userData != null ? userData.result.userDetails.userEmail : "no user data"}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Phone : </span>
                          <span style={{ fontSize: "12px" }}>
                            {userData != null ? userData.result.userDetails.userContactNumber : "no user data"}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px" }}>Address : </span>
                          <span style={{ fontSize: "12px" }}>
                            {userData != null ? userData.result.userDetails.userAddress : "no user data"}
                          </span>
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
                  <div class="invoice-footer">
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ color: "text.secondary", mt: 3 }}
                    >
                      I agree to Shop House&nbsp;
                      <Link underline="always" color="text.primary" href="#">
                        Terms of Service ,
                      </Link>
                      {""}and , {""}
                      <Link underline="always" color="text.primary" href="#">
                        Privacy Policy
                      </Link>
                      .
                    </Typography>
                  </div>
                </PDFExport>
              </div>
              <div class="invoice-footer" style={{ marginTop: "20px" }}>
                <LoadingButton
                  style={{ marginRight: "2%" }}
                  fullWidth
                  size="small"
                  type="button"
                  onClick={exportPDFWithComponent}
                  variant="contained"
                >
                  Generate a PDF
                </LoadingButton>
                <LoadingButton
                  size="small"
                  fullWidth
                  type="button"
                  variant="contained"
                  // onClick={handleValue}
                  onClick={() => { handleClickOpen() }}
                >
                  Proceed to Payment
                </LoadingButton>
              </div>
              <PaymentDialogBox {...dialogBoxProps} />
            </CardContent>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default PaymentInvoice;
