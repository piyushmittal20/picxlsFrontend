import {
  ADMIN_POSTLIST_REQUEST,
  ADMIN_POSTLIST_SUCCESS,
  ADMIN_POSTLIST_FAIL,
  ADMIN_POSTDETAIL_REQUEST,
  ADMIN_POSTDETAIL_SUCCESS,
  ADMIN_POSTDETAIL_FAIL,
  ADMIN_POSTDELETE_REQUEST,
  ADMIN_POSTDELETE_SUCCESS,
  ADMIN_POSTDELETE_FAIL,
  ADMIN_POSTSTATUS_REQUEST,
  ADMIN_POSTSTATUS_SUCCESS,
  ADMIN_POSTSTATUS_FAIL,
  ADMIN_REPORTLIST_REQUEST,
  ADMIN_REPORTLIST_SUCCESS,
  ADMIN_REPORTLIST_FAIL,
  ADMIN_REPORTSTATUS_REQUEST,
  ADMIN_REPORTSTATUS_SUCCESS,
  ADMIN_REPORTSTATUS_FAIL,
  ADMIN_POSTDELETE_RESET,
} from "../constants/adminConstants";

export const listPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ADMIN_POSTLIST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case ADMIN_POSTLIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
      };
    case ADMIN_POSTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postDetailReducer = (state = { feed: {} }, action) => {
  switch (action.type) {
    case ADMIN_POSTDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_POSTDETAIL_SUCCESS:
      return {
        loading: false,
        feed: action.payload,
      };
    case ADMIN_POSTDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_POSTDELETE_REQUEST:
      return { loading: true };
    case ADMIN_POSTDELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_POSTDELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_POSTDELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const postStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_POSTSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_POSTSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_POSTSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listReportReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REPORTLIST_REQUEST:
      return { loading: true };
    case ADMIN_REPORTLIST_SUCCESS:
      return {
        loading: false,
        reports: action.payload,
      };
    case ADMIN_REPORTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const statusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REPORTSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_REPORTSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_REPORTSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
