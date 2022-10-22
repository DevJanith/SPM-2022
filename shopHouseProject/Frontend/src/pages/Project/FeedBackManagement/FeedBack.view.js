// material

import { Container, Stack, Typography } from "@mui/material";
// components

import LoadingButton from "@mui/lab/LoadingButton";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  createFeedback,
  deleteFeedback,
  updateFeedback,
} from "../../../actions/feedback.action";
import Iconify from "../../../components/Iconify";
import Page from "../../../components/Page";

export function FeedBackView(props) {
  const dispatch = useDispatch();

  // const {
  // } = props
  const [value, setValue] = React.useState("1");
  const [feedbackData, setFeedbackData] = React.useState();
  //   add form data
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [mobile, setMobileNo] = React.useState();
  const [rating, setRating] = React.useState(2);
  const [description, setDescription] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [reloadVal, setReloadVal] = React.useState(false);
  const [formValid, setFormValid] = React.useState(true);

  //   update form data
  const [nameUpdate, setNameUpdate] = React.useState();
  const [emailUpdate, setEmailUpdate] = React.useState();
  const [mobileNoUpdate, setMobileNoUpdate] = React.useState();
  const [ratingUpdate, setRatingUpdate] = React.useState(2);
  const [descriptionUpdate, setDescriptionUpdate] = React.useState();
  const [updateID, setUpdateID] = React.useState();
  const [deleteID, setDeleteID] = React.useState();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const feedback = useSelector((state) => state.feedbackReducer);

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  const handleClickOpenDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  //   update dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (item) => {
    setOpen(true);
    setNameUpdate(item.name);
    setEmailUpdate(item.email);
    setMobileNoUpdate(item.mobile);
    setRatingUpdate(item.rating);
    setDescriptionUpdate(item.description);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   view feedbacks filter

  function deleteFeedBack(id) {
    notifyDeleted();
    handleCloseDelete();
    setReloadVal(!reloadVal);
    dispatch(deleteFeedback(id));
  }

  function updateFeedBack(e) {
    e.preventDefault();
    let id = window.sessionStorage.getItem("userId");
    const feedback = {
      userID: id,
      name: nameUpdate,
      email: emailUpdate,
      mobile: mobileNoUpdate,
      description: descriptionUpdate,
      rating: ratingUpdate,
    };
    handleClose();
    notifyUpdate();
    setReloadVal(!reloadVal);
    dispatch(updateFeedback(updateID, feedback));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formValid) {
      setLoading(true);

      let userID = window.sessionStorage.getItem("userId");
      const feedbackData = {
        userID,
        name,
        email,
        mobile,
        description,
        rating,
      };
      console.log(feedbackData);

      dispatch(createFeedback(feedbackData));
    } else {
      notifyInvalidMobileNumber();
    }
  }

  useEffect(() => {
    try {
      console.log(feedback);
      //feedback success
      if (feedback.code == "00" && feedback.msg == "success") {
        switch (feedback.type) {
          case "GETALL":
            //feedback get all on sucess
            setData(feedback.data);
            break;
          case "POST":
            //feedback create on sucess
            setReloadVal(!reloadVal);
            notify();
            setLoading(false);
            clear();
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [feedback]);

  const clear = () => {
    console.log("here");
    setName("");
    setEmail("");
    setMobileNo("");
    setDescription("");
    setRating(2);
  };

  const notify = () => {
    toast("Feedback Added!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyUpdate = () => {
    toast("Feedback Updated!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyDeleted = () => {
    toast("Feedback Deleted!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyInvalidMobileNumber = () => {
    toast("Invalid Mobile Number...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //get all feedback start
  useEffect(() => {
    axios
      .get(
        `https://shop-house-eca5b0c5-2934-4483.herokuapp.com/shop-house/feedback/user/${window.sessionStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reloadVal, data]);

  // useEffect(() => {
  //   dispatch(getFeedbacks());
  // }, [reloadVal]);

  // const data = [
  //   {
  //     name: "sdsdsdsd",
  //     email: "23233333",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 1,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  //   {
  //     name: "sdsd",
  //     email: "23233",
  //     mobile: 232323,
  //     description: "sdsdsdsd",
  //     rating: 5,
  //     options: "2323",
  //     date: "22/25/2525",
  //   },
  // ];
  const columns = [
    { field: "name", headerName: "Name", width: 70 },
    { field: "email", headerName: "Email", width: 70 },
    { field: "mobile", headerName: "Mobile Number", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "date", headerName: "Date", width: 130 },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 90,
    },
  ];

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
            Feedback Page
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
                <Tab label="Add Feedback" value="1" />
                <Tab label="View Your Feedbacks" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography variant="h4" gutterBottom>
                Please Fill below form.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Card
                  sx={{
                    padding: 2,
                    paddingBottom: 7,
                  }}
                  variant="outlined"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        value={name}
                        variant="outlined"
                        required
                        fullWidth
                        sx={{
                          marginTop: 3,
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        fullWidth
                        sx={{
                          marginTop: 3,
                        }}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <TextField
                        id="outlined-basic"
                        type="number"
                        label="Mobile Number (Ex:- 71849457)"
                        variant="outlined"
                        required
                        fullWidth
                        value={mobile}
                        onChange={(e) => {
                          if (e.target.value <= 0) {
                            setMobileNo(0);
                          } else if (e.target.value.length !== 9) {
                            setMobileNo(e.target.value);
                            setFormValid(false);
                          } else {
                            setMobileNo(e.target.value);
                            setFormValid(true);
                          }
                        }}
                        sx={{
                          marginTop: 3,
                        }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, Number(e.target.value))
                            .toString()
                            .slice(0, 9);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack
                        spacing={4}
                        sx={{
                          marginLeft: 5,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            marginTop: 3,
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            Click the Stars to Rate Us*
                          </Typography>
                          <Rating
                            required
                            name="size-large"
                            defaultValue={2}
                            size="large"
                            value={rating}
                            onChange={(event, newValue) => {
                              setRating(newValue);
                            }}
                          />
                        </Stack>

                        <TextField
                          variant="outlined"
                          label="Enter your feedback here (Maximum - 120 Characters)"
                          fullWidth
                          required
                          multiline
                          inputProps={{ maxLength: 120 }}
                          erortext="Maximum number of characters enterted"
                          rows={5}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                        <LoadingButton
                          variant="contained"
                          sx={{
                            height: 40,
                          }}
                          type="submit"
                          loading={loading}
                        >
                          Send Feedback
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </form>
            </TabPanel>

            {/* 



                        View User feedbacks


            */}

            <TabPanel value="2">
              <Card
                sx={{
                  padding: 2,
                  paddingBottom: 7,
                }}
                variant="outlined"
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Mobile Number</TableCell>
                        <TableCell align="right">Descriptions</TableCell>
                        <TableCell align="right">Date</TableCell>

                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
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

                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              startIcon={getIcon("eva:edit-2-outline")}
                              color="warning"
                              sx={{
                                marginTop: 1,
                              }}
                              onClick={() => {
                                handleClickOpen(row);
                                setUpdateID(row._id);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              startIcon={getIcon("eva:trash-2-outline")}
                              sx={{
                                marginLeft: 2,
                                marginTop: 1,
                              }}
                              color="error"
                              onClick={() => {
                                handleClickOpenDelete();
                                setDeleteID(row._id);
                              }}
                            ></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>

              {/* update */}

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth="true"
              >
                <form onSubmit={updateFeedBack}>
                  <DialogTitle id="alert-dialog-title">
                    {"Update Feedback Details"}
                  </DialogTitle>
                  <DialogContent>
                    <Card
                      sx={{
                        padding: 2,
                        paddingBottom: 7,
                      }}
                      variant="outlined"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{
                              marginTop: 3,
                            }}
                            value={nameUpdate}
                            onChange={(e) => {
                              setNameUpdate(e.target.value);
                            }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            fullWidth
                            sx={{
                              marginTop: 3,
                            }}
                            value={emailUpdate}
                            onChange={(e) => {
                              setEmailUpdate(e.target.value);
                            }}
                          />
                          <TextField
                            id="outlined-basic"
                            type="number"
                            label="Mobile Number (Ex:- 71849457)"
                            variant="outlined"
                            required
                            fullWidth
                            value={mobileNoUpdate}
                            onChange={(e) => {
                              if (e.target.value <= 0) {
                                setMobileNoUpdate(0);
                              } else {
                                setMobileNoUpdate(e.target.value);
                              }
                            }}
                            sx={{
                              marginTop: 3,
                            }}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                Number(e.target.value)
                              )
                                .toString()
                                .slice(0, 9);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack
                            spacing={4}
                            sx={{
                              marginLeft: 5,
                            }}
                          >
                            <Stack
                              direction="column"
                              spacing={2}
                              sx={{
                                marginTop: 3,
                              }}
                            >
                              <Typography variant="subtitle1" gutterBottom>
                                Click the Stars to Rate Us*
                              </Typography>
                              <Rating
                                required
                                name="size-large"
                                defaultValue={2}
                                size="large"
                                value={ratingUpdate}
                                onChange={(event, newValue) => {
                                  setRatingUpdate(newValue);
                                }}
                              />
                            </Stack>

                            <TextField
                              variant="outlined"
                              label="Enter your feedback here (Maximum - 120 Characters)"
                              fullWidth
                              required
                              multiline
                              inputProps={{ maxLength: 120 }}
                              erortext="Maximum number of characters enterted"
                              rows={5}
                              value={descriptionUpdate}
                              onChange={(e) => {
                                setDescriptionUpdate(e.target.value);
                              }}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button
                      variant="contained"
                      sx={{
                        height: 40,
                      }}
                      type="submit"
                      autoFocus
                    >
                      Update Feedback
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
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
      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this feedback?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>No</Button>
          <Button
            onClick={() => {
              deleteFeedBack(deleteID);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
