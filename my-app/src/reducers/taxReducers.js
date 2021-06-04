import {
  ADMIN_TAXDETAIL_FAIL,
  ADMIN_TAXDETAIL_REQUEST,
  ADMIN_TAXDETAIL_SUCCESS,
  ADMIN_TAXDETAIL_RESET,
  ADMIN_TAXLIST_FAIL,
  ADMIN_TAXLIST_REQUEST,
  ADMIN_TAXLIST_SUCCESS,
  ADMIN_TAXSTATUS_FAIL,
  ADMIN_TAXSTATUS_REQUEST,
  ADMIN_TAXSTATUS_SUCCESS,
  ADMIN_TAXUPDATE_FAIL,
  ADMIN_TAXUPDATE_REQUEST,
  ADMIN_TAXUPDATE_RESET,
  ADMIN_TAXUPDATE_SUCCESS,
  ADMIN_TAXDELETE_REQUEST,
  ADMIN_TAXDELETE_SUCCESS,
  ADMIN_TAXDELETE_FAIL,
  ADMIN_TAXDELETE_RESET,
  ADMIN_ADDTAX_REQUEST,
  ADMIN_ADDTAX_SUCCESS,
  ADMIN_ADDTAX_FAIL,
  ADMIN_ADDTAX_RESET,
} from "../constants/adminConstants";

export const listTaxReducer = (state = { taxes: [] }, action) => {
  switch (action.type) {
    case ADMIN_TAXLIST_REQUEST:
      return {
        loading: true,
        taxes: [],
      };
    case ADMIN_TAXLIST_SUCCESS:
      return {
        loading: false,
        taxes: action.payload.taxes,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
      };
    case ADMIN_TAXLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const taxDetailReducer = (state = { tax: {} }, action) => {
  switch (action.type) {
    case ADMIN_TAXDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_TAXDETAIL_SUCCESS:
      return {
        loading: false,
        tax: action.payload,
      };
    case ADMIN_TAXDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_TAXDETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const taxStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TAXSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_TAXSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_TAXSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const taxUpdateReducer = (state = { tax: {} }, action) => {
  switch (action.type) {
    case ADMIN_TAXUPDATE_REQUEST:
      return { loading: true };
    case ADMIN_TAXUPDATE_SUCCESS:
      return {
        loading: false,
        tax: action.payload,
        success: true,
      };
    case ADMIN_TAXUPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_TAXUPDATE_RESET:
      return { tax: {} };
    default:
      return state;
  }
};

export const deleteTaxReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_TAXDELETE_REQUEST:
      return { loading: true };
    case ADMIN_TAXDELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_TAXDELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_TAXDELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const taxCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDTAX_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_ADDTAX_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDTAX_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDTAX_RESET:
      return {};
    default:
      return state;
  }
};
