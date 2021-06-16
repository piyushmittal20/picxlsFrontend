import axios from "axios";

import {
  ADMIN_STARTAGLIST_REQUEST,
  ADMIN_STARTAGLIST_SUCCESS,
  ADMIN_STARTAGLIST_FAIL,
  ADMIN_ADDSTARTAG_REQUEST,
  ADMIN_ADDSTARTAG_SUCCESS,
  ADMIN_ADDSTARTAG_FAIL,
  ADMIN_DELETESTARTAG_REQUEST,
  ADMIN_DELETESTARTAG_SUCCESS,
  ADMIN_DELETESTARTAG_FAIL,
  ADMIN_STARTAGDETAIL_REQUEST,
  ADMIN_STARTAGDETAIL_SUCCESS,
  ADMIN_STARTAGDETAIL_FAIL,
  ADMIN_UPDATESTARTAG_REQUEST,
  ADMIN_UPDATESTARTAG_SUCCESS,
  ADMIN_UPDATESTARTAG_FAIL,
  ADMIN_STARTAGSTATUS_REQUEST,
  ADMIN_STARTAGSTATUS_SUCCESS,
  ADMIN_STARTAGSTATUS_FAIL,
} from "../constants/adminConstants";

import {
  startagList,
  addStartag,
  deleteStartag,
  startagDetail,
  startagUpdate,
  startagStatus,
} from "../service";

export const getAllStartag =
  (search = "", pageNumber = "", status = "", startDate = "", lastDate = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_STARTAGLIST_REQUEST });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${startagList}/startags?search=${search}&pageNumber=${pageNumber}&status=${status}&startDate=${startDate}&lastDate=${lastDate}`,
        config
      );

      dispatch({
        type: ADMIN_STARTAGLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_STARTAGLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createStartag = (startag) => async (dispatch, getState) => {
  console.log(startag);
  try {
    dispatch({ type: ADMIN_ADDSTARTAG_REQUEST });

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
      data: { savedStartag },
    } = await axios.post(`${addStartag}/startag`, startag, config);

    dispatch({
      type: ADMIN_ADDSTARTAG_SUCCESS,
      payload: savedStartag,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDSTARTAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeStartag = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETESTARTAG_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${deleteStartag}/startag/${id}`,
      config
    );

    dispatch({
      type: ADMIN_DELETESTARTAG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETESTARTAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStartag = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_STARTAGDETAIL_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { startag },
    } = await axios.get(`${startagDetail}/startag/${id}`, config);

    dispatch({
      type: ADMIN_STARTAGDETAIL_SUCCESS,
      payload: startag,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STARTAGDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStartag = (startag, id) => async (dispatch, getState) => {
  console.log(startag);

  try {
    dispatch({ type: ADMIN_UPDATESTARTAG_REQUEST });

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
      data: { savedStartag },
    } = await axios.put(`${startagUpdate}/startag/${id}`, startag, config);

    dispatch({ type: ADMIN_UPDATESTARTAG_SUCCESS });
    dispatch({
      type: ADMIN_STARTAGDETAIL_SUCCESS,
      payload: savedStartag,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATESTARTAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStartagStatus =
  (startag, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_STARTAGSTATUS_REQUEST });

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
        data: { updatedStartag },
      } = await axios.put(
        `${startagStatus}/startagStatus/${id}`,
        startag,
        config
      );

      dispatch({
        type: ADMIN_STARTAGSTATUS_SUCCESS,
        payload: updatedStartag,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_STARTAGSTATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
