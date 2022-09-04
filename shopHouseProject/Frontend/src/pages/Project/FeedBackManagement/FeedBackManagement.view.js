// material

import { Container, Stack, Typography } from "@mui/material";
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
import Card from "@mui/material/Card";
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
import Page from "../../../components/Page";
import { getFeedbacks } from "../../../actions/feedback.action";
import axios from "axios";
import { getFeedbackReport } from "../../../api";

export function FeedBackViewManagement(props) {
  // const {
  // } = props
  const [value, setValue] = React.useState("1");
  const [tableData, setTableData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [feedbackData, setFeedbackData] = React.useState();
  const [reportData, setReportData] = React.useState([]);
  const [nodata, setNodata] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

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

  //   view feedbacks filter
  const filterByRating = (value) => {
    filterItems.sort((a, b) => Number(a.rating) - Number(b.rating));
    console.log("ascending", filterItems);
  };

  //search
  const filterItems = tableData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // const data = useSelector((state) => state.getFeedbacks);

  // useEffect(() => {
  //   try {
  //     console.log(data);
  //     dispatch(getFeedbacks());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/shop-house/feedback/")
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
      .post("http://localhost:5000/shop-house/feedback/report", filter)
      .then((res) => {
        console.log(res);
        if (res.data.data) {
          setReportData(res.data.data);
          console.log(reportData);
          setNodata(false);
        } else {
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

  return (
    <Page title="Dashboard: FeedBack">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            FeedBack Page
          </Typography>
        </Stack>

        {/* you're content */}
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="View Feedbacks" value="1" />
                <Tab label="View Feedback Report" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Typography variant="h4" gutterBottom>
                Customer Feedbacks
              </Typography>
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
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Search Feedback by Name"
                    variant="outlined"
                    required
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    size="small"
                    sx={{
                      minWidth: 300,
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      marginTop: 0,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filter by Rating
                      </InputLabel>
                      {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        size="small"
                        sx={{
                          minWidth: 200,
                        }}
                        onChange={(e) => {
                          filterByRating(e.target.value);
                        }}
                      >
                        <MenuItem value={1}>Default</MenuItem>
                        <MenuItem value={2}>Low to High</MenuItem>
                        <MenuItem value={3}>High to Low</MenuItem>
                      </Select> */}
                    </FormControl>
                  </Stack>
                </Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Mobile Number</TableCell>
                        <TableCell align="right">Descriptions</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Rating (Out of 5)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filterItems.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.mobile}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {loading ? (
                  <Box sx={{ width: "100%", marginTop: 5 }}>
                    <LinearProgress />
                  </Box>
                ) : null}
              </Card>
            </TabPanel>
            <TabPanel value="2">
              <Typography variant="h4" gutterBottom>
                Customer Feedback Report
              </Typography>
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
                      onClick={getFeedbackReport}
                    >
                      Generate Report
                    </Button>
                  </Stack>
                  <Button
                    variant="outlined"
                    startIcon={getIcon("eva:arrow-circle-down-outline")}
                    sx={{ marginLeft: 2 }}
                    color="error"
                  >
                    Download as PDF
                  </Button>
                </Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Mobile Number</TableCell>
                        <TableCell align="right">Descriptions</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Rating (Out of 5)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportData.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.mobile}</TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {loading ? (
                  <Box sx={{ width: "100%", marginTop: 5 }}>
                    <LinearProgress />
                  </Box>
                ) : null}

                {nodata ? (
                  <center>
                    <Typography variant="h4" gutterBottom>
                      --------- No Data ---------
                    </Typography>
                  </center>
                ) : null}
              </Card>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
