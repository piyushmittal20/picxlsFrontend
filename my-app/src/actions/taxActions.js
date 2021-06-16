import axios from "axios";

import {
  ADMIN_ADDTAX_FAIL,
  ADMIN_ADDTAX_REQUEST,
  ADMIN_ADDTAX_SUCCESS,
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
  taxAdd,
} from "../service";

export const getTaxlisting =
  (pageNumber = "", status = "", startaDate = "", lastDate = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_TAXLIST_REQUEST });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${getTaxlist}/taxlist?pageNumber=${pageNumber}&status=${status}&startDate=${startaDate}&lastDate=${lastDate}`,
        config
      );

      dispatch({
        type: ADMIN_TAXLIST_SUCCESS,
        payload: data,
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
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { tax },
    } = await axios.get(`${getTaxDetails}/taxdetail/${id}`, config);

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
      data: { savedTax },
    } = await axios.put(`${taxUpdate}/tax/${id}`, tax, config);

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

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${taxDelete}/tax/${id}`, config);

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

export const createTax = (tax) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDTAX_REQUEST });

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
      data: { savedTax },
    } = await axios.post(`${taxAdd}/tax`, tax, config);

    dispatch({
      type: ADMIN_ADDTAX_SUCCESS,
      payload: savedTax,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDTAX_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
