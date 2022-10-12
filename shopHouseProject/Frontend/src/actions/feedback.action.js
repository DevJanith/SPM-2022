import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ONE,
  REPORT,
} from "../constants/actionTypes.constants";

import * as api from "../api/index.js";

export const getFeedbacks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFeedbacks();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createFeedback = (feedback) => async (dispatch) => {
  try {
    const { data } = await api.createFeedback(feedback);
    // console.log("actions", data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateFeedback = (id, feedback) => async (dispatch) => {
  try {
    const { data } = await api.updateFeedback(id, feedback);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    await api.deleteFeedback(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOneFeedback = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOneFeedback(id);

    dispatch({ type: FETCH_ONE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFeedbackReport = (filter) => async (dispatch) => {
  try {
    const { data } = await api.getFeedbackReport(filter);

    dispatch({ type: REPORT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
