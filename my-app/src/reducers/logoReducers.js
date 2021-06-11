import {
  ADMIN_LOGODETAIL_FAIL,
  ADMIN_LOGODETAIL_REQUEST,
  ADMIN_LOGODETAIL_SUCCESS,
  ADMIN_LOGOLIST_FAIL,
  ADMIN_LOGOLIST_REQUEST,
  ADMIN_LOGOLIST_SUCCESS,
  ADMIN_LOGOUPDATE_FAIL,
  ADMIN_LOGOUPDATE_REQUEST,
  ADMIN_LOGOUPDATE_RESET,
  ADMIN_LOGOUPDATE_SUCCESS,
  ADMIN_PANNELLOGO_FAIL,
  ADMIN_PANNELLOGO_REQUEST,
  ADMIN_PANNELLOGO_SUCCESS,
  ADMIN_TITLELOGO_FAIL,
  ADMIN_TITLELOGO_REQUEST,
  ADMIN_TITLELOGO_SUCCESS,
} from "../constants/adminConstants";

export const logoListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGOLIST_REQUEST:
      return { loading: true };
    case ADMIN_LOGOLIST_SUCCESS:
      return {
        loading: false,
        logos: action.payload,
      };
    case ADMIN_LOGOLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const logoDetailReducer = (state = { logo: {} }, action) => {
  switch (action.type) {
    case ADMIN_LOGODETAIL_REQUEST:
      return { loading: true };
    case ADMIN_LOGODETAIL_SUCCESS:
      return {
        loading: false,
        logo: action.payload,
      };
    case ADMIN_LOGODETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const logoUpdateReducer = (state = { logo: {} }, action) => {
  switch (action.type) {
    case ADMIN_LOGOUPDATE_REQUEST:
      return { loading: true };
    case ADMIN_LOGOUPDATE_SUCCESS:
      return {
        loading: false,
        logo: action.payload,
        success: true,
      };
    case ADMIN_LOGOUPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_LOGOUPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const pannelLogoReducer = (state = { logo: {} }, action) => {
  switch (action.type) {
    case ADMIN_PANNELLOGO_REQUEST:
      return { loading: true };
    case ADMIN_PANNELLOGO_SUCCESS:
      return {
        loading: false,
        logo: action.payload,
      };
    case ADMIN_PANNELLOGO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const titleLogoReducer = (state = { logo: {} }, action) => {
  switch (action.type) {
    case ADMIN_TITLELOGO_REQUEST:
      return { loading: true };
    case ADMIN_TITLELOGO_SUCCESS:
      return {
        loading: false,
        logo: action.payload,
      };
    case ADMIN_TITLELOGO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
