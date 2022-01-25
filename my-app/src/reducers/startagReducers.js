import {
  ADMIN_STARTAGLIST_REQUEST,
  ADMIN_STARTAGLIST_SUCCESS,
  ADMIN_STARTAGLIST_FAIL,
  ADMIN_ADDSTARTAG_REQUEST,
  ADMIN_ADDSTARTAG_SUCCESS,
  ADMIN_ADDSTARTAG_FAIL,
  ADMIN_ADDSTARTAG_RESET,
  ADMIN_DELETESTARTAG_REQUEST,
  ADMIN_DELETESTARTAG_SUCCESS,
  ADMIN_DELETESTARTAG_FAIL,
  ADMIN_STARTAGDETAIL_REQUEST,
  ADMIN_STARTAGDETAIL_SUCCESS,
  ADMIN_STARTAGDETAIL_FAIL,
  ADMIN_UPDATESTARTAG_REQUEST,
  ADMIN_UPDATESTARTAG_SUCCESS,
  ADMIN_UPDATESTARTAG_FAIL,
  ADMIN_UPDATESTARTAG_RESET,
  ADMIN_STARTAGSTATUS_REQUEST,
  ADMIN_STARTAGSTATUS_SUCCESS,
  ADMIN_STARTAGSTATUS_FAIL,
  ADMIN_DELETESTARTAG_RESET,
  ADMIN_REPORTSTARTAGLIST_REQUEST,
  ADMIN_REPORTSTARTAGLIST_SUCCESS,
  ADMIN_REPORTSTARTAGLIST_FAIL,
} from "../constants/adminConstants";

export const startagListReducer = (state = { startags: [] }, action) => {
  switch (action.type) {
    case ADMIN_STARTAGLIST_REQUEST:
      return {
        loading: true,
        startags: [],
      };
    case ADMIN_STARTAGLIST_SUCCESS:
      return {
        loading: false,
        startags: action.payload.startags,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
      };
    case ADMIN_STARTAGLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createStartagReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDSTARTAG_REQUEST:
      return { loading: true };
    case ADMIN_ADDSTARTAG_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDSTARTAG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDSTARTAG_RESET:
      return {};
    default:
      return state;
  }
};

export const startagDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETESTARTAG_REQUEST:
      return { loading: true };
    case ADMIN_DELETESTARTAG_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETESTARTAG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETESTARTAG_RESET:
      return {};
    default:
      return state;
  }
};

export const startagDetailReducer = (state = { startag: {} }, action) => {
  switch (action.type) {
    case ADMIN_STARTAGDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_STARTAGDETAIL_SUCCESS:
      return {
        loading: false,
        startag: action.payload,
      };
    case ADMIN_STARTAGDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const startagUpdateReducer = (state = { startag: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATESTARTAG_REQUEST:
      return { loading: true };
    case ADMIN_UPDATESTARTAG_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATESTARTAG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATESTARTAG_RESET:
      return { startag: {} };
    default:
      return state;
  }
};

export const startagStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_STARTAGSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_STARTAGSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_STARTAGSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const startagReportlistReducer = (
  state = { startagReports: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_REPORTSTARTAGLIST_REQUEST:
      return { loading: true };
    case ADMIN_REPORTSTARTAGLIST_SUCCESS:
      return {
        loading: false,
        startagReports: action.payload,
      };
    case ADMIN_REPORTSTARTAGLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
