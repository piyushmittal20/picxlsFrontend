import {
  ADMIN_ADDANSWER_FAIL,
  ADMIN_ADDANSWER_REQUEST,
  ADMIN_ADDANSWER_RESET,
  ADMIN_ADDANSWER_SUCCESS,
  ADMIN_CONTACTDETAIL_FAIL,
  ADMIN_CONTACTDETAIL_REQUEST,
  ADMIN_CONTACTDETAIL_SUCCESS,
  ADMIN_CONTACTLIST_FAIL,
  ADMIN_CONTACTLIST_REQUEST,
  ADMIN_CONTACTLIST_SUCCESS,
  ADMIN_STATUSCHANGE_FAIL,
  ADMIN_STATUSCHANGE_REQUEST,
  ADMIN_STATUSCHANGE_SUCCESS,
} from "../constants/adminConstants";

export const listContactReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case ADMIN_CONTACTLIST_REQUEST:
      return {
        loading: true,
        contacts: [],
      };
    case ADMIN_CONTACTLIST_SUCCESS:
      return {
        loading: false,
        contacts: action.payload.contactList,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
      };
    case ADMIN_CONTACTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const detailContactReducer = (state = { conatact: {} }, action) => {
  switch (action.type) {
    case ADMIN_CONTACTDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_CONTACTDETAIL_SUCCESS:
      return {
        loading: false,
        contact: action.payload,
      };
    case ADMIN_CONTACTDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const statusContactReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_STATUSCHANGE_REQUEST:
      return { loading: true };
    case ADMIN_STATUSCHANGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_STATUSCHANGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const answerConcernReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDANSWER_REQUEST:
      return { loading: true };
    case ADMIN_ADDANSWER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDANSWER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDANSWER_RESET:
      return {};
    default:
      return state;
  }
};
