import axios from "axios";

import {
  ADMIN_POSTLIST_REQUEST,
  ADMIN_POSTLIST_SUCCESS,
  ADMIN_POSTLIST_FAIL,
  ADMIN_POSTDETAIL_REQUEST,
  ADMIN_POSTDETAIL_SUCCESS,
  ADMIN_POSTDETAIL_FAIL,
  ADMIN_REPORTLIST_REQUEST,
  ADMIN_REPORTLIST_SUCCESS,
  ADMIN_REPORTLIST_FAIL,
  ADMIN_POSTDELETE_REQUEST,
  ADMIN_POSTDELETE_SUCCESS,
  ADMIN_POSTDELETE_FAIL,
  ADMIN_POSTSTATUS_REQUEST,
  ADMIN_POSTSTATUS_SUCCESS,
  ADMIN_POSTSTATUS_FAIL,
  ADMIN_REPORTSTATUS_REQUEST,
  ADMIN_REPORTSTATUS_SUCCESS,
  ADMIN_REPORTSTATUS_FAIL,
} from "../constants/adminConstants";
import {
  postDelete,
  postDetail,
  postList,
  postStatusUpdate,
  reportsList,
  reportStatus,
} from "../service";

export const getAllPosts =
  (pageNumber = "", status = "", startDate = "", lastDate = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_POSTLIST_REQUEST });

      const { data } = await axios.get(
        `${postList}/posts?pageNumber=${pageNumber}&status=${status}&startDate=${startDate}&lastDate=${lastDate}`
      );

      dispatch({
        type: ADMIN_POSTLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_POSTLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_POSTDETAIL_REQUEST });

    const {
      data: { post },
    } = await axios.get(`${postDetail}/post/${id}`);

    dispatch({
      type: ADMIN_POSTDETAIL_SUCCESS,
      payload: post,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_POSTDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_POSTDELETE_REQUEST });

    const { data } = await axios.delete(`${postDelete}/post/${id}`);

    dispatch({
      type: ADMIN_POSTDELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_POSTDELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePostStatus = (post, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_POSTSTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { updatedPost },
    } = await axios.put(`${postStatusUpdate}/postStatus/${id}`, post, config);

    dispatch({
      type: ADMIN_POSTSTATUS_SUCCESS,
      payload: updatedPost,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_POSTSTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REPORTLIST_REQUEST });

    const {
      data: { reports },
    } = await axios.get(`${reportsList}/reports/${id}`);

    dispatch({
      type: ADMIN_REPORTLIST_SUCCESS,
      payload: reports,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_REPORTLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportStatusUpdate =
  (report, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_REPORTSTATUS_REQUEST });

      const {
        data: { updatedReport },
      } = await axios.put(`${reportStatus}/postReport/${id}`, report);

      dispatch({
        type: ADMIN_REPORTSTATUS_SUCCESS,
        payload: updatedReport,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_REPORTSTATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
