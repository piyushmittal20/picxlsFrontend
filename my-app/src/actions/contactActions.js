import axios from "axios";

import {
  ADMIN_ADDANSWER_FAIL,
  ADMIN_ADDANSWER_REQUEST,
  ADMIN_ADDANSWER_SUCCESS,
  ADMIN_CONTACTDETAIL_FAIL,
  ADMIN_CONTACTDETAIL_REQUEST,
  ADMIN_CONTACTDETAIL_SUCCESS,
  ADMIN_CONTACTLIST_FAIL,
  ADMIN_CONTACTLIST_REQUEST,
  ADMIN_CONTACTLIST_SUCCESS,
  ADMIN_STATUSCHANGE_FAIL,
  ADMIN_STATUSCHANGE_REQUEST,
  ADMIN_STATUSCHANGE_SUCCESS,
} from "../constants/adminConstants";

import {
  answerConcern,
  contactStatusChange,
  getContactDetail,
  getContactList,
} from "../service";

export const getContactListing =
  (pageNumber = "", status = "", startaDate = "", lastDate = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CONTACTLIST_REQUEST });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${getContactList}/contactlist?pageNumber=${pageNumber}&status=${status}&startDate=${startaDate}&lastDate=${lastDate}`,
        config
      );

      dispatch({
        type: ADMIN_CONTACTLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_CONTACTLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const contactDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CONTACTDETAIL_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { contact },
    } = await axios.get(`${getContactDetail}/contact/${id}`, config);

    dispatch({
      type: ADMIN_CONTACTDETAIL_SUCCESS,
      payload: contact,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CONTACTDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const contactStatusUpdate =
  (status, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_STATUSCHANGE_REQUEST });

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
        data: { savedContact },
      } = await axios.put(
        `${contactStatusChange}/contact/${id}`,
        status,
        config
      );

      dispatch({
        type: ADMIN_STATUSCHANGE_SUCCESS,
        payload: savedContact,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_STATUSCHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addAnswer = (answer, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDANSWER_REQUEST });

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
      data: { savedContact },
    } = await axios.put(`${answerConcern}/addanswer/${id}`, answer, config);

    dispatch({
      type: ADMIN_ADDANSWER_SUCCESS,
      payload: savedContact,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDANSWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
