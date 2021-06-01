import axios from "axios";

import {
  ADMIN_ADDUSER_FAIL,
  ADMIN_ADDUSER_REQUEST,
  ADMIN_ADDUSER_SUCCESS,
  ADMIN_DELETEUSER_FAIL,
  ADMIN_DELETEUSER_REQUEST,
  ADMIN_DELETEUSER_SUCCESS,
  ADMIN_DROPPING_FAIL,
  ADMIN_DROPPING_REQUEST,
  ADMIN_DROPPING_SUCCESS,
  ADMIN_UPDATEUSER_FAIL,
  ADMIN_UPDATEUSER_REQUEST,
  ADMIN_UPDATEUSER_SUCCESS,
  ADMIN_USERDETAIL_FAIL,
  ADMIN_USERDETAIL_REQUEST,
  ADMIN_USERDETAIL_SUCCESS,
  ADMIN_USERLIST_FAIL,
  ADMIN_USERLIST_REQUEST,
  ADMIN_USERLIST_SUCCESS,
  ADMIN_USERREPORTSTATUS_FAIL,
  ADMIN_USERREPORTSTATUS_REQUEST,
  ADMIN_USERREPORTSTATUS_SUCCESS,
  ADMIN_USERREPORTS_FAIL,
  ADMIN_USERREPORTS_REQUEST,
  ADMIN_USERREPORTS_SUCCESS,
  ADMIN_USERSTATUS_FAIL,
  ADMIN_USERSTATUS_REQUEST,
  ADMIN_USERSTATUS_SUCCESS,
  ADMIN_VERIFYING_FAIL,
  ADMIN_VERIFYING_REQUEST,
  ADMIN_VERIFYING_SUCCESS,
  ADMIN_VERIFYREQUESTDETAIL_FAIL,
  ADMIN_VERIFYREQUESTDETAIL_REQUEST,
  ADMIN_VERIFYREQUESTDETAIL_SUCCESS,
  ADMIN_VERIFYREQUESTLIST_FAIL,
  ADMIN_VERIFYREQUESTLIST_REQUEST,
  ADMIN_VERIFYREQUESTLIST_SUCCESS,
} from "../constants/adminConstants";

import {
  addUser,
  detailUser,
  removeUser,
  userList,
  updateUser,
  verifyRequest,
  verifyingUser,
  droppingUser,
  requestDetail,
  userStatus,
  userReportStatus,
} from "../service";

export const listUsers =
  (search = "", pageNumber = "", status = "", startDate = "", lastDate = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_USERLIST_REQUEST });

      const { data } = await axios.get(
        `${userList}/user?search=${search}&pageNumber=${pageNumber}&status=${status}&startDate=${startDate}&lastDate=${lastDate}`
      );

      dispatch({
        type: ADMIN_USERLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_USERLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createUser = (newUser) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDUSER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedUser },
    } = await axios.post(`${addUser}/user`, newUser, config);

    dispatch({
      type: ADMIN_ADDUSER_SUCCESS,
      payload: savedUser,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDUSER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETEUSER_REQUEST });

    const { data } = await axios.delete(`${removeUser}/user/${id}`);

    dispatch({
      type: ADMIN_DELETEUSER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETEUSER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USERDETAIL_REQUEST });

    const {
      data: { user },
    } = await axios.get(`${detailUser}/user/${id}`);

    dispatch({
      type: ADMIN_USERDETAIL_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdate = (user, id) => async (dispatch, getState) => {
  console.log(user);
  try {
    dispatch({ type: ADMIN_UPDATEUSER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedUser },
    } = await axios.put(`${updateUser}/user/${id}`, user, config);

    dispatch({ type: ADMIN_UPDATEUSER_SUCCESS });
    dispatch({
      type: ADMIN_USERDETAIL_SUCCESS,
      payload: savedUser,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATEUSER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyRequestList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_VERIFYREQUESTLIST_REQUEST });

    const {
      data: { requests },
    } = await axios.get(`${verifyRequest}/request`);

    dispatch({
      type: ADMIN_VERIFYREQUESTLIST_SUCCESS,
      payload: requests,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_VERIFYREQUESTLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyRequestDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_VERIFYREQUESTDETAIL_REQUEST });

    const {
      data: { request },
    } = await axios.get(`${requestDetail}/request/${id}`);

    dispatch({
      type: ADMIN_VERIFYREQUESTDETAIL_SUCCESS,
      payload: request,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_VERIFYREQUESTDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifying = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_VERIFYING_REQUEST });

    const {
      data: { savedUser },
    } = await axios.put(`${verifyingUser}/verifying/${id}`);

    dispatch({
      type: ADMIN_VERIFYING_SUCCESS,
      payload: savedUser,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_VERIFYING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dropping = (reason, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DROPPING_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data: savedUser } = await axios.put(
      `${droppingUser}/dropping/${id}`,
      reason,
      config
    );

    dispatch({
      type: ADMIN_DROPPING_SUCCESS,
      payload: savedUser,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DROPPING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserStatus = (user, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USERSTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { updatedUser },
    } = await axios.put(`${userStatus}/userStatus/${id}`, user, config);

    dispatch({
      type: ADMIN_USERSTATUS_SUCCESS,
      payload: updatedUser,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERSTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userReportList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USERREPORTS_REQUEST });

    const {
      data: { reports },
    } = await axios.get(`${userReportStatus}/userReports/${id}`);

    dispatch({
      type: ADMIN_USERREPORTS_SUCCESS,
      payload: reports,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USERREPORTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userReportUpdateStatus =
  (status, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_USERREPORTSTATUS_REQUEST });

      const {
        data: { updatedReport },
      } = await axios.put(`${userReportStatus}/userReport/${id}`, status);

      dispatch({
        type: ADMIN_USERREPORTSTATUS_SUCCESS,
        payload: updatedReport,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_USERREPORTSTATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
