import axios from "axios";

import {
  ADMIN_TAXDELETE_FAIL,
  ADMIN_TAXDELETE_REQUEST,
  ADMIN_TAXDELETE_SUCCESS,
  ADMIN_TAXDETAIL_FAIL,
  ADMIN_TAXDETAIL_REQUEST,
  ADMIN_TAXDETAIL_SUCCESS,
  ADMIN_TAXLIST_FAIL,
  ADMIN_TAXLIST_REQUEST,
  ADMIN_TAXLIST_SUCCESS,
  ADMIN_TAXSTATUS_FAIL,
  ADMIN_TAXSTATUS_REQUEST,
  ADMIN_TAXSTATUS_SUCCESS,
  ADMIN_TAXUPDATE_FAIL,
  ADMIN_TAXUPDATE_REQUEST,
  ADMIN_TAXUPDATE_SUCCESS,
} from "../constants/adminConstants";
import {
  getTaxlist,
  getTaxDetails,
  taxStatusUpdate,
  taxUpdate,
  taxDelete,
} from "../service";

export const getTaxlisting = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TAXLIST_REQUEST });

    const {
      data: { taxList },
    } = await axios.get(`${getTaxlist}/taxlist`);

    dispatch({
      type: ADMIN_TAXLIST_SUCCESS,
      payload: taxList,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAXLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTaxDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TAXDETAIL_REQUEST });

    const {
      data: { tax },
    } = await axios.get(`${getTaxDetails}/taxdetail/${id}`);

    dispatch({
      type: ADMIN_TAXDETAIL_SUCCESS,
      payload: tax,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAXDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const taxUpdateStatus = (tax, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TAXSTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { updatedTax },
    } = await axios.put(`${taxStatusUpdate}/taxStatus/${id}`, tax, config);

    dispatch({
      type: ADMIN_TAXSTATUS_SUCCESS,
      payload: updatedTax,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAXSTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTax = (tax, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TAXUPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedTax },
    } = await axios.put(`${taxUpdate}/tax/${id}`, tax, config);

    console.log(savedTax);

    dispatch({ type: ADMIN_TAXUPDATE_SUCCESS });
    dispatch({
      type: ADMIN_TAXDETAIL_SUCCESS,
      payload: savedTax,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAXUPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTax = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_TAXDELETE_REQUEST });

    const { data } = await axios.delete(`${taxDelete}/tax/${id}`);

    dispatch({
      type: ADMIN_TAXDELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TAXDELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
