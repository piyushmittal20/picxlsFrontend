import {
  ADMIN_ADDUSER_FAIL,
  ADMIN_ADDUSER_REQUEST,
  ADMIN_ADDUSER_RESET,
  ADMIN_ADDUSER_SUCCESS,
  ADMIN_DELETEUSER_FAIL,
  ADMIN_DELETEUSER_REQUEST,
  ADMIN_DELETEUSER_SUCCESS,
  ADMIN_DROPPING_FAIL,
  ADMIN_DROPPING_REQUEST,
  ADMIN_DROPPING_SUCCESS,
  ADMIN_UPDATEUSER_FAIL,
  ADMIN_UPDATEUSER_REQUEST,
  ADMIN_UPDATEUSER_RESET,
  ADMIN_UPDATEUSER_SUCCESS,
  ADMIN_USERDETAIL_FAIL,
  ADMIN_USERDETAIL_REQUEST,
  ADMIN_USERDETAIL_SUCCESS,
  ADMIN_USERLIST_FAIL,
  ADMIN_USERLIST_REQUEST,
  ADMIN_USERLIST_SUCCESS,
  ADMIN_USERSTATUS_FAIL,
  ADMIN_USERSTATUS_REQUEST,
  ADMIN_USERSTATUS_SUCCESS,
  ADMIN_VERIFYING_FAIL,
  ADMIN_VERIFYING_REQUEST,
  ADMIN_VERIFYING_RESET,
  ADMIN_VERIFYING_SUCCESS,
  ADMIN_VERIFYREQUESTDETAIL_FAIL,
  ADMIN_VERIFYREQUESTDETAIL_REQUEST,
  ADMIN_VERIFYREQUESTDETAIL_SUCCESS,
  ADMIN_VERIFYREQUESTLIST_FAIL,
  ADMIN_VERIFYREQUESTLIST_REQUEST,
  ADMIN_VERIFYREQUESTLIST_SUCCESS,
} from "../constants/adminConstants";

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USERLIST_REQUEST:
      return { loading: true };
    case ADMIN_USERLIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ADMIN_USERLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDUSER_REQUEST:
      return { loading: true };
    case ADMIN_ADDUSER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDUSER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDUSER_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETEUSER_REQUEST:
      return { loading: true };
    case ADMIN_DELETEUSER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETEUSER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USERDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_USERDETAIL_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case ADMIN_USERDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATEUSER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATEUSER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case ADMIN_UPDATEUSER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATEUSER_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const requestListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_VERIFYREQUESTLIST_REQUEST:
      return { loading: true };
    case ADMIN_VERIFYREQUESTLIST_SUCCESS:
      return {
        loading: false,
        requests: action.payload,
      };
    case ADMIN_VERIFYREQUESTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const requestDetailReducer = (state = { request: {} }, action) => {
  switch (action.type) {
    case ADMIN_VERIFYREQUESTDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_VERIFYREQUESTDETAIL_SUCCESS:
      return {
        loading: false,
        request: action.payload,
      };
    case ADMIN_VERIFYREQUESTDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userVerifyingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_VERIFYING_REQUEST:
      return { loading: true };
    case ADMIN_VERIFYING_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_VERIFYING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_VERIFYING_RESET:
      return {};
    default:
      return state;
  }
};

export const userDroppingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DROPPING_REQUEST:
      return { loading: true };
    case ADMIN_DROPPING_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DROPPING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USERSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_USERSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_USERSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
