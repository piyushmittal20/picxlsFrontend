import axios from "axios";

import {
  ADMIN_ADDPAGE_REQUEST,
  ADMIN_ADDPAGE_SUCCESS,
  ADMIN_ADDPAGE_FAIL,
  ADMIN_PAGELIST_REQUEST,
  ADMIN_PAGELIST_SUCCESS,
  ADMIN_PAGELIST_FAIL,
  ADMIN_PAGESTATUS_REQUEST,
  ADMIN_PAGESTATUS_SUCCESS,
  ADMIN_PAGESTATUS_FAIL,
} from "../constants/adminConstants";
import { updatePageStatus, getPages } from "../service";

export const getAllPages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PAGELIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const {
      data: { pages },
    } = await axios.get(`${getPages}/pages`, config);

    dispatch({
      type: ADMIN_PAGELIST_SUCCESS,
      payload: pages,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PAGELIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPage = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDPAGE_REQUEST });

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
      data: { newPage },
    } = await axios.post(
      `https://picxls-testing.herokuapp.com/api/admin/page`,
      page,
      config
    );

    dispatch({
      type: ADMIN_ADDPAGE_SUCCESS,
      payload: newPage,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDPAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeStatus = (page, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PAGESTATUS_REQUEST });

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
      data: { updatedPage },
    } = await axios.put(`${updatePageStatus}/pageStatus/${id}`, page, config);

    dispatch({
      type: ADMIN_PAGESTATUS_SUCCESS,
      payload: updatedPage,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PAGESTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
