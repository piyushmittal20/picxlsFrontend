import {
  ADMIN_ABUSEDELETE_FAIL,
  ADMIN_ABUSEDELETE_REQUEST,
  ADMIN_ABUSEDELETE_RESET,
  ADMIN_ABUSEDELETE_SUCCESS,
  ADMIN_ABUSEDETAIL_FAIL,
  ADMIN_ABUSEDETAIL_REQUEST,
  ADMIN_ABUSEDETAIL_SUCCESS,
  ADMIN_ABUSELIST_FAIL,
  ADMIN_ABUSELIST_REQUEST,
  ADMIN_ABUSELIST_SUCCESS,
  ADMIN_ABUSESTATUS_FAIL,
  ADMIN_ABUSESTATUS_REQUEST,
  ADMIN_ABUSESTATUS_SUCCESS,
} from "../constants/adminConstants";

export const listAbuseReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case ADMIN_ABUSELIST_REQUEST:
      return {
        loading: true,
        reports: [],
      };
    case ADMIN_ABUSELIST_SUCCESS:
      return {
        loading: false,
        reports: action.payload.reports,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
      };
    case ADMIN_ABUSELIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const detailAbuseReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case ADMIN_ABUSEDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_ABUSEDETAIL_SUCCESS:
      return {
        loading: false,
        report: action.payload.report,
        contentDetails: action.payload.contentDetails,
      };
    case ADMIN_ABUSEDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const abuseStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ABUSESTATUS_REQUEST:
      return { loading: true };
    case ADMIN_ABUSESTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ABUSESTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const abuseRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ABUSEDELETE_REQUEST:
      return { loading: true };
    case ADMIN_ABUSEDELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ABUSEDELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ABUSEDELETE_RESET:
      return {}
    default:
      return state;
  }
};
