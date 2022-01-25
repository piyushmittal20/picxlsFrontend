import {
  ADMIN_ADDNOTIFICATION_FAIL,
  ADMIN_ADDNOTIFICATION_REQUEST,
  ADMIN_ADDNOTIFICATION_RESET,
  ADMIN_ADDNOTIFICATION_SUCCESS,
  ADMIN_NOTIFICATIONDETAIL_FAIL,
  ADMIN_NOTIFICATIONDETAIL_REQUEST,
  ADMIN_NOTIFICATIONDETAIL_SUCCESS,
  ADMIN_NOTIFICATIONLIST_FAIL,
  ADMIN_NOTIFICATIONLIST_REQUEST,
  ADMIN_NOTIFICATIONLIST_SUCCESS,
  ADMIN_UPDATENOTIFICATION_FAIL,
  ADMIN_UPDATENOTIFICATION_REQUEST,
  ADMIN_UPDATENOTIFICATION_RESET,
  ADMIN_UPDATENOTIFICATION_SUCCESS,
} from "../constants/adminConstants";

export const notificationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDNOTIFICATION_REQUEST:
      return { loading: true };
    case ADMIN_ADDNOTIFICATION_SUCCESS:
      return {
        loading: false,
        notification: action.payload,
        success: true,
      };
    case ADMIN_ADDNOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDNOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const notificationDetailReducer = (
  state = { notification: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_NOTIFICATIONDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_NOTIFICATIONDETAIL_SUCCESS:
      return {
        loading: false,
        notification: action.payload,
      };
    case ADMIN_NOTIFICATIONDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const notificationListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_NOTIFICATIONLIST_REQUEST:
      return { loading: true };
    case ADMIN_NOTIFICATIONLIST_SUCCESS:
      return {
        loading: false,
        notifications: action.payload.notifications,
        pages: action.payload.pages,
      };
    case ADMIN_NOTIFICATIONLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const notificationEditReducer = (
  state = { notification: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_UPDATENOTIFICATION_REQUEST:
      return { loading: true };
    case ADMIN_UPDATENOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATENOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATENOTIFICATION_RESET:
      return { notification: {} };
    default:
      return state;
  }
};
