import axios from "axios";
import {
  ADMIN_ADDNOTIFICATION_FAIL,
  ADMIN_ADDNOTIFICATION_REQUEST,
  ADMIN_ADDNOTIFICATION_SUCCESS,
  ADMIN_NOTIFICATIONDETAIL_FAIL,
  ADMIN_NOTIFICATIONDETAIL_REQUEST,
  ADMIN_NOTIFICATIONDETAIL_SUCCESS,
  ADMIN_NOTIFICATIONLIST_FAIL,
  ADMIN_NOTIFICATIONLIST_REQUEST,
  ADMIN_NOTIFICATIONLIST_SUCCESS,
  ADMIN_UPDATENOTIFICATION_FAIL,
  ADMIN_UPDATENOTIFICATION_REQUEST,
  ADMIN_UPDATENOTIFICATION_SUCCESS,
} from "../constants/adminConstants";

import {
  notificationAdd,
  notificationDetail,
  notificationEdit,
  notificationList,
} from "../service";

export const getNotificationListing =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_NOTIFICATIONLIST_REQUEST });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${notificationList}/notification?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: ADMIN_NOTIFICATIONLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_NOTIFICATIONLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getNotificationDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_NOTIFICATIONDETAIL_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { notification },
    } = await axios.get(`${notificationDetail}/notification/${id}`, config);

    dispatch({
      type: ADMIN_NOTIFICATIONDETAIL_SUCCESS,
      payload: notification,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_NOTIFICATIONDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNotification =
  (notification) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_ADDNOTIFICATION_REQUEST });

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
        data: { savedNotification },
      } = await axios.post(
        `${notificationAdd}/notification`,
        notification,
        config
      );

      dispatch({
        type: ADMIN_ADDNOTIFICATION_SUCCESS,
        payload: savedNotification,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ADDNOTIFICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editNotification =
  (notification, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_UPDATENOTIFICATION_REQUEST,
      });

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
        data: { updatedNotification },
      } = await axios.put(
        `${notificationEdit}/notification/${id}`,
        notification,
        config
      );

      dispatch({ type: ADMIN_UPDATENOTIFICATION_SUCCESS });
      dispatch({
        type: ADMIN_NOTIFICATIONDETAIL_SUCCESS,
        payload: updatedNotification,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATENOTIFICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
