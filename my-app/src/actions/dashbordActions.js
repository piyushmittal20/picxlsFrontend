import axios from "axios";

import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAIL,
} from "../constants/adminConstants";

import {
  last24hourusercount,
  last7dayusercount,
  totalusercount,
  last14dayusercount,
  last28dayusercount,
} from "../service";

export const adminDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DASHBOARD_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const response = await Promise.allSettled([
      axios.get(`${totalusercount}/totalusers`, config),
      axios.get(`${last24hourusercount}/lastonedayusers`, config),
      axios.get(`${last7dayusercount}/lastsevendayusers`, config),
      axios.get(`${last14dayusercount}/lastfourteendayusers`, config),
      axios.get(`${last28dayusercount}/lasttwentyeightdayusers`, config),
    ]);

    const [total, last24, last7, last14, last28] = response;

    dispatch({
      type: ADMIN_DASHBOARD_SUCCESS,
      total: total,
      last24: last24,
      last7: last7,
      last14: last14,
      last28: last28,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
