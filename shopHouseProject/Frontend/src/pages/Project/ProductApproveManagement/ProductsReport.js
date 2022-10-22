import {
    Card, Container, Stack, Typography, CardMedia
} from '@mui/material';
import * as React from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import Page from '../../../components/Page';
// import { ItemCreateForm } from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getIcon, Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../../components/Iconify";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import nodataImage from "../../../assets/no-data.svg";
import nodataIcon from "../../../assets/remove.png";
import ShopHouse_Logo from "../../../assets/ShopHouse_Logo.JPG";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
// import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';


const ContentStyle = styled('div')(({ theme }) => ({
    margin: '5vh 0',
    display: 'flex',
    flexDirection: 'column',
}));

const Div_Heading = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#f2f2f2',
    fontSize: '20px',
    padding: theme.spacing(1),
}));

const Div_Logo = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#343434',
    fontSize: '15px',
    fontcolor: '#FFFFFF',
    padding: theme.spacing(1),
}));

// Table customized Design

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

// Circular Progress Design
function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
      /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

export default function ProductsReport(props) {

    const {
        items,
        itemData,
        setItemData,
        handleSubmit,
        clear,
        currentId,
        setCurrentId,
        value,
        setValue
    } = props

    const notify = () => {
        toast('Item Creation Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const [reportButton, setReportButton] = React.useState(true);
    const [reportData, setReportData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [tableData, setTableData] = React.useState([]);
    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs());
    const [today, setToday] = React.useState(dayjs());
    const [nodata, setNodata] = React.useState(false);

    // Circular Progress Design
    const [progress, setProgress] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);
    //end

    const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();

    //search
    const filterItems = tableData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
    );

    function getFeedbackReport() {
        console.log();
        console.log(startDate.toISOString());
        console.log(endDate.toISOString());
    
        setLoading(true);
        const filter = {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        };
        axios
          .post("https://shop-house-eca5b0c5-2934-4483.herokuapp.com/shop-house/product/report", filter)
          .then((res) => {
            console.log(res);
            if (res.data.data) {
              setReportData(res.data.data);
              console.log(reportData);
              setNodata(false);
              setReportButton(false);
            } else {
              setReportButton(true);
              setNodata(true);
              setReportData([]);
              console.log(reportData);
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }

    const pdfExportComponent = React.useRef(null);

    const generatePDF = () => {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    };

    function getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day =`${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
    }

    return (
        <Page title="Products">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Products Report
                    </Typography>
                </Stack>
                <Card sx={{
                    padding: 2,
                    paddingBottom: 7,
                    }}
                    variant="outlined">

                    <Container fixed>
                        <ContentStyle> 
                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Generate Report of all the products from here</Typography>

                            {/* Date Picker Starts From here */}
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    marginBottom: 3,
                                }}
                            >
                            <Stack direction="row" spacing={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => {
                                    setStartDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                    <TextField {...params} size="small" />
                                    )}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => {
                                    setEndDate(newValue);
                                    }}
                                    renderInput={(params) => (
                                    <TextField {...params} size="small" />
                                    )}
                                />

                                </LocalizationProvider>

                                    <Button 
                                        variant="contained" 
                                        startIcon={getIcon("eva:file-text-outline")}
                                        color="primary"
                                        sx={{ marginLeft: 2 }}
                                        size="small"
                                        onClick={getFeedbackReport}
                                        >
                                    Generate Report
                                    </Button>

                            </Stack>
                            <Button
                                disabled={reportButton}
                                variant="outlined"
                                startIcon={getIcon("eva:arrow-circle-down-outline")}
                                sx={{ marginLeft: 2 }}
                                color="error"
                                onClick={generatePDF}
                            >
                                Download as PDF
                            </Button>
                            </Grid>
                            
                            {/* Date Picker End Here */}

                            <TableContainer component={Paper} id="reportTable">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="left">Price</TableCell>
                                        {/* <TableCell align="left">Product Status</TableCell> */}
                                        <TableCell align="left">Date</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {reportData.map((row) => (
                                        <TableRow
                                        key={row._id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                        >
                                        <TableCell component="th" scope="row"  align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="left">{row.qty}</TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        {/* <TableCell align="right">{row.rating}</TableCell> */}
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </PDFExport> */}


                {loading ? (
                  <Box sx={{ width: "100%", marginTop: 5 }}>
                    <LinearProgress />
                    {/* <CircularProgressWithLabel value={progress} /> */}
                  </Box>
                ) : null}
                <br></br>
                <br></br>

                {nodata ? (
                  <center>
                    <img 
                    src={nodataIcon} 
                    alt="No Data" 
                    width="128px" 
                    height="128px"
                />
                
                    <Typography variant="h6" gutterBottom color="#808080">
                      No data available for the selected Dates
                    </Typography>
                  </center>
                ) : null}

                {/* report */}

                {/* ---------------------------------------------------------------------------------------------- */}

                    <Card
                    sx={{
                        position: "absolute",
                        left: "-6000px",
                        top: 0,
                    }}
                    >
                    <PDFExport
                        ref={pdfExportComponent}
                        papersize="A4"
                        fileName={`Sales Report_${getDateString()}`}
                        margin="1cm"
                    >

                        <Box
                        component="img"
                        sx={{
                            height: 60,
                            width: 180,
                        }}
                        // alt="Signature"
                        src={ShopHouse_Logo}
                        />

                        <br></br>

                        <center>
                            <Div_Heading>{"Sales Report"}</Div_Heading>
                        </center>
                        <br></br>

                        <Typography variant="h6" gutterBottom color={"#0B0B45"}>
                        Sales Report - From
                        {" : " + startDate.toISOString().substring(0, 10) + ""} To
                        {" : " + endDate.toISOString().substring(0, 10)}
                        </Typography>
                        <br></br>

                        <TableContainer component={Paper} id="reportTable">
                        {/* <Table
                            sx={{ minWidth: 650, border: 1 }}
                            aria-label="simple table"
                        > */}
                        <Table sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="left" >Description</StyledTableCell>
                                <StyledTableCell align="left" >Quantity</StyledTableCell>
                                <StyledTableCell align="left" >Price</StyledTableCell>
                                <StyledTableCell align="left" >Date</StyledTableCell>
                            </TableRow>
                            </TableHead>

                            <TableBody>
                            {reportData.map((row) => (
                                <StyledTableRow key={row._id} >

                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                                    <StyledTableCell align="left">{row.qty}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.date}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <br></br>

                        <Typography
                            variant="h7"
                            gutterBottom
                            sx={{ marginTop: 5 }}
                            >
                            Report Generated On
                            {" : " + today.format("YYYY-MM-DD HH:mm:ss")}
                        </Typography>
                        <br></br>

                        <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ marginTop: 5 }}
                        >
                        I/We hereby certify that the Products informations on this Sales Report
                        is true and correct and the content of this Products names and Quantity 
                        are as stated above
                        </Typography>

                        <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ marginTop: 5 }}
                        >
                        .................................
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Thanks & Regards
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                        Signature
                        </Typography>
                        <Box
                        component="img"
                        sx={{
                            height: 50,
                            width: 100,
                        }}
                        alt="Signature"
                        src="@assets/signature.png"
                        />
                    </PDFExport>
                    </Card>     

                    {/* ---------------------------------------------------------------------------------------------- */}
                    </ContentStyle>
                </Container>
            </Card>
            </Container> 
            {/* <button onClick={notify}>Notify!</button> */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </Page>
    );
}
