import axios from "axios";

import {
  ADMIN_LOGODETAIL_FAIL,
  ADMIN_LOGODETAIL_REQUEST,
  ADMIN_LOGODETAIL_SUCCESS,
  ADMIN_LOGOLIST_FAIL,
  ADMIN_LOGOLIST_REQUEST,
  ADMIN_LOGOLIST_SUCCESS,
  ADMIN_LOGOUPDATE_FAIL,
  ADMIN_LOGOUPDATE_REQUEST,
  ADMIN_LOGOUPDATE_SUCCESS,
  ADMIN_PANNELLOGO_FAIL,
  ADMIN_PANNELLOGO_REQUEST,
  ADMIN_PANNELLOGO_SUCCESS,
  ADMIN_TITLELOGO_FAIL,
  ADMIN_TITLELOGO_REQUEST,
  ADMIN_TITLELOGO_SUCCESS,
} from "../constants/adminConstants";

import { logoDetail, logoList, logoUpdate, logoDetails } from "../service";

export const getLogoList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGOLIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { logos },
    } = await axios.get(`${logoList}/logo`, config);

    dispatch({
      type: ADMIN_LOGOLIST_SUCCESS,
      payload: logos,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLogoDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGODETAIL_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { logo },
    } = await axios.get(`${logoDetail}/logo/${id}`, config);

    dispatch({
      type: ADMIN_LOGODETAIL_SUCCESS,
      payload: logo,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGODETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLogo = (logo, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGOUPDATE_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { updatedLogo },
    } = await axios.put(`${logoUpdate}/logo/${id}`, logo, config);

    dispatch({ type: ADMIN_LOGOUPDATE_SUCCESS });
    dispatch({
      type: ADMIN_LOGODETAIL_SUCCESS,
      payload: updatedLogo,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPannelLogo = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PANNELLOGO_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { logo },
    } = await axios.get(`${logoDetails}/logoDetail?title=${title}`, config);

    dispatch({
      type: ADMIN_PANNELLOGO_SUCCESS,
      payload: logo,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PANNELLOGO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTitleLogo = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TITLELOGO_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { logo },
    } = await axios.get(`${logoDetails}/logoDetail?title=${title}`, config);

    dispatch({
      type: ADMIN_TITLELOGO_SUCCESS,
      payload: logo,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TITLELOGO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
