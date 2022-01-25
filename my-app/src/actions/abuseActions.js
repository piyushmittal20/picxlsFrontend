import axios from "axios";

import {
  ADMIN_COMMENTDETAIL_FAIL,
  ADMIN_COMMENTDETAIL_REQUEST,
  ADMIN_COMMENTDETAIL_SUCCESS,
  ADMIN_COMMENTLIST_FAIL,
  ADMIN_COMMENTLIST_REQUEST,
  ADMIN_COMMENTLIST_SUCCESS,
  ADMIN_COMMENTSTATUS_FAIL,
  ADMIN_COMMENTSTATUS_REQUEST,
  ADMIN_COMMENTSTATUS_SUCCESS,
  ADMIN_REPLYDETAIL_FAIL,
  ADMIN_REPLYDETAIL_REQUEST,
  ADMIN_REPLYDETAIL_SUCCESS,
  ADMIN_REPLYLIST_FAIL,
  ADMIN_REPLYLIST_REQUEST,
  ADMIN_REPLYLIST_SUCCESS,
  ADMIN_REPLYSTATUS_FAIL,
  ADMIN_REPLYSTATUS_REQUEST,
  ADMIN_REPLYSTATUS_SUCCESS,
} from "../constants/adminConstants";

import {
  commentList,
  commentDetail,
  commentStatus,
  replyList,
  replyStatus,
  detailReply,
} from "../service";

export const getAllComment =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: ADMIN_COMMENTLIST_REQUEST,
    });

    try {
      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${commentList}/comments?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: ADMIN_COMMENTLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_COMMENTLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const commentStatusUpdate =
  (status, id) => async (dispatch, getState) => {
    dispatch({ type: ADMIN_COMMENTSTATUS_REQUEST });

    try {
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
        data: { updateComment },
      } = await axios.put(`${commentStatus}/comment/${id}`, status, config);

      dispatch({
        type: ADMIN_COMMENTSTATUS_SUCCESS,
        payload: updateComment,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_COMMENTSTATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCommentDetail = (id) => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_COMMENTDETAIL_REQUEST,
  });

  try {
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
      data: { comment },
    } = await axios.get(`${commentDetail}/comment/${id}`, config);

    dispatch({
      type: ADMIN_COMMENTDETAIL_SUCCESS,
      payload: comment,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COMMENTDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllReply =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: ADMIN_REPLYLIST_REQUEST,
    });

    try {
      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${replyList}/reply?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: ADMIN_REPLYLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_REPLYLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateReplyStatus = (status, id) => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_REPLYSTATUS_REQUEST,
  });

  try {
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
      data: { updateReply },
    } = await axios.put(`${replyStatus}/reply/${id}`, status, config);

    dispatch({
      type: ADMIN_REPLYSTATUS_SUCCESS,
      payload: updateReply,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_REPLYSTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReplyDetail = (id) => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_REPLYDETAIL_REQUEST,
  });

  try {
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
      data: { replyDetail },
    } = await axios.get(`${detailReply}/reply/${id}`, config);

    dispatch({
      type: ADMIN_REPLYDETAIL_SUCCESS,
      payload: replyDetail,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_REPLYDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
