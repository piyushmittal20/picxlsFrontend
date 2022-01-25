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

export const listCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COMMENTLIST_REQUEST:
      return { loading: true };
    case ADMIN_COMMENTLIST_SUCCESS:
      return {
        loading: false,
        comments: action.payload.comments,
        pages: action.payload.pages,
      };
    case ADMIN_COMMENTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const statusUpdateCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COMMENTSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_COMMENTSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_COMMENTSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const detailCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case ADMIN_COMMENTDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_COMMENTDETAIL_SUCCESS:
      return {
        loading: false,
        comment: action.payload,
      };
    case ADMIN_COMMENTDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REPLYLIST_REQUEST:
      return { loading: true };
    case ADMIN_REPLYLIST_SUCCESS:
      return {
        loading: false,
        replies: action.payload.replyList,
        pages: action.payload.pages,
      };
    case ADMIN_REPLYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const statusReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REPLYSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_REPLYSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_REPLYSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const detailReplyReducer = (state = { reply: {} }, action) => {
  switch (action.type) {
    case ADMIN_REPLYDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_REPLYDETAIL_SUCCESS:
      return {
        loading: false,
        reply: action.payload,
      };
    case ADMIN_REPLYDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
