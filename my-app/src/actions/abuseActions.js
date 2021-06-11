import axios from "axios";

import {
  ADMIN_ABUSEDELETE_FAIL,
  ADMIN_ABUSEDELETE_REQUEST,
  ADMIN_ABUSEDELETE_SUCCESS,
  ADMIN_ABUSEDETAIL_FAIL,
  ADMIN_ABUSEDETAIL_REQUEST,
  ADMIN_ABUSEDETAIL_SUCCESS,
  ADMIN_ABUSELIST_FAIL,
  ADMIN_ABUSELIST_REQUEST,
  ADMIN_ABUSELIST_SUCCESS,
  ADMIN_ABUSESTATUS_FAIL,
  ADMIN_ABUSESTATUS_REQUEST,
  ADMIN_ABUSESTATUS_SUCCESS,
} from "../constants/adminConstants";

import {
  abuseStatus,
  getAbuseDetail,
  getAbuseList,
  removeAbuse,
} from "../service";

export const getAllAbuseList =
  (pageNumber = "", status = "", type = "", content = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_ABUSELIST_REQUEST });

      const { data } = await axios.get(`${getAbuseList}/reportlist?pageNumber=${pageNumber}&status=${status}&type=${type}&content=${content}`);

      dispatch({
        type: ADMIN_ABUSELIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ABUSELIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAbuseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ABUSEDETAIL_REQUEST });

    const { data } = await axios.get(`${getAbuseDetail}/report/${id}`);

    console.log(data);

    dispatch({
      type: ADMIN_ABUSEDETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ABUSEDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const abuseStatusUpdate = (status, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ABUSESTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedReport },
    } = await axios.put(`${abuseStatus}/reportStatus/${id}`, status, config);

    dispatch({
      type: ADMIN_ABUSESTATUS_SUCCESS,
      payload: savedReport,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ABUSESTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeContent = (reason, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ABUSEDELETE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${removeAbuse}/report/${id}`,
      reason,
      config
    );

    dispatch({
      type: ADMIN_ABUSEDELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ABUSEDELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
