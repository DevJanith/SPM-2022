import {
  Card, Container, Stack, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../../../components/Page';
import { ItemCreateForm } from './Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material

// import { CardMedia, Container, Stack, Typography } from "@mui/material";
// components
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIcon, Icon } from "@iconify/react";
import Iconify from "../../../components/Iconify";
// import Page from "../../../components/Page";
import { getFeedbacks } from "../../../actions/feedback.action";
import axios from "axios";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import nodataImage from "../../../assets/no-data.svg";
import { getItemReport } from '../../../api';

const ContentStyle = styled('div')(({ theme }) => ({
  margin: '5vh 0',
  display: 'flex',
  flexDirection: 'column',
}));


export default function ItemReport(props) {
  // const {
  // } = props
  const [value, setValue] = React.useState("1");
  const [tableData, setTableData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [feedbackData, setFeedbackData] = React.useState();
  const [reportData, setReportData] = React.useState([]);
  const [nodata, setNodata] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [reportButton, setReportButton] = React.useState(true);

  const dispatch = useDispatch();

  const [today, setToday] = React.useState(dayjs());
  //  admin report
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  //   view feedbacks admin filter
  const [filter, setFilter] = React.useState();

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  // //   view feedbacks filter
  // const filterByRating = (value) => {
  //   filterItems.sort((a, b) => Number(a.rating) - Number(b.rating));
  //   console.log("ascending", filterItems);
  // };

  //search
  // const filterItems = tableData.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://shop-house-eca5b0c5-2934-4483.herokuapp.com/shop-house/Item/")
      .then((res) => {
        setTableData(res.data.data);
        console.log(tableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function getItemReport() {
    console.log();
    console.log(startDate.toISOString());
    console.log(endDate.toISOString());

    setLoading(true);
    const filter = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    axios
      .post("http://localhost:5000/shop-house/item/report", filter)
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

  // const {
  //     items,
  //     itemData,
  //     setItemData,
  //     handleSubmit,
  //     clear,
  //     currentId,
  //     setCurrentId,
  //     value,
  //     setValue
  // } = props

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

  return (
    <Page title="Item">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Item Report
          </Typography>
        </Stack>
        <Card
          sx={{
            padding: 2,
            paddingBottom: 7,
          }}
          variant="outlined"
        >
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
                sx={{ marginLeft: 2 }}
                color="primary"
                size="small"
                onClick={getItemReport}
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
        </Card>
        <TableContainer component={Paper} id="reportTable">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Descriptions</TableCell>
                <TableCell align="right">Date</TableCell>

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
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Card>
                    <Container maxWidth="md">
                        <ContentStyle>
                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter Item details below.</Typography>

                            <ItemCreateForm
                                items={items}
                                itemData={itemData}
                                setItemData={setItemData}
                                handleSubmitForm={handleSubmit}
                                clear={clear}
                                currentId={currentId}
                                setCurrentId={setCurrentId}
                                value={value}
                                setValue={setValue}
                                notify={notify}
                            />
                        </ContentStyle>
                    </Container>
                </Card> */}
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
      {/* </PDFExport> */}

      {loading ? (
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <LinearProgress />
        </Box>
      ) : null}

      {nodata ? (
        <center>
          <img src={nodataImage} alt="No Data" />

          <Typography variant="h4" gutterBottom color="#E07171">
            No Data
          </Typography>
        </center>
      ) : null}

      {/* report */}

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
          fileName="feedback-report"
          margin="1cm"
        >
          <center>
            <Typography variant="h2" gutterBottom>
              Shop House
            </Typography>
          </center>
          <Typography variant="h4" gutterBottom color={"primary"}>
            Item Report - From
            {" : " + startDate.toISOString().substring(0, 10)} To
            {" : " + endDate.toISOString().substring(0, 10)}
          </Typography>

          <TableContainer component={Paper} id="reportTable">
            <Table
              sx={{ minWidth: 650, border: 1 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ border: 1 }}>
                  <TableCell sx={{ border: 1 }}>Name</TableCell>
                  <TableCell align="right" sx={{ border: 1 }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ border: 1 }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ border: 1 }}>
                    Descriptions
                  </TableCell>
                  <TableCell align="right" sx={{ border: 1 }}>
                    Date
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ marginTop: 5 }}
          >
            Report Generated On
            {" : " + today.format("YYYY-MM-DD HH:mm:ss")}
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ marginTop: 5 }}
          >
            This report contains all the Items that enter during selected time
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ marginTop: 5 }}
          >
            .................................
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

    </Page>
  );
}
