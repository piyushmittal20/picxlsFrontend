import {
  ADMIN_ADDCITY_FAIL,
  ADMIN_ADDCITY_REQUEST,
  ADMIN_ADDCITY_RESET,
  ADMIN_ADDCITY_SUCCESS,
  ADMIN_ADDCOUNTRY_FAIL,
  ADMIN_ADDCOUNTRY_REQUEST,
  ADMIN_ADDCOUNTRY_RESET,
  ADMIN_ADDCOUNTRY_SUCCESS,
  ADMIN_ADDSTATE_FAIL,
  ADMIN_ADDSTATE_REQUEST,
  ADMIN_ADDSTATE_RESET,
  ADMIN_ADDSTATE_SUCCESS,
  ADMIN_CITYDETAIL_FAIL,
  ADMIN_CITYDETAIL_REQUEST,
  ADMIN_CITYDETAIL_SUCCESS,
  ADMIN_CITYLIST_FAIL,
  ADMIN_CITYLIST_REQUEST,
  ADMIN_CITYLIST_SUCCESS,
  ADMIN_CITYSTATUS_FAIL,
  ADMIN_CITYSTATUS_REQUEST,
  ADMIN_CITYSTATUS_SUCCESS,
  ADMIN_COUNTRYDETAIL_FAIL,
  ADMIN_COUNTRYDETAIL_REQUEST,
  ADMIN_COUNTRYDETAIL_SUCCESS,
  ADMIN_COUNTRYLIST_FAIL,
  ADMIN_COUNTRYLIST_REQUEST,
  ADMIN_COUNTRYLIST_SUCCESS,
  ADMIN_COUNTRYSTATUS_FAIL,
  ADMIN_COUNTRYSTATUS_REQUEST,
  ADMIN_COUNTRYSTATUS_SUCCESS,
  ADMIN_DELETECITY_FAIL,
  ADMIN_DELETECITY_REQUEST,
  ADMIN_DELETECITY_SUCCESS,
  ADMIN_DELETECOUNTRY_FAIL,
  ADMIN_DELETECOUNTRY_REQUEST,
  ADMIN_DELETECOUNTRY_SUCCESS,
  ADMIN_DELETESTATE_FAIL,
  ADMIN_DELETESTATE_REQUEST,
  ADMIN_DELETESTATE_SUCCESS,
  ADMIN_STATEDETAIL_FAIL,
  ADMIN_STATEDETAIL_REQUEST,
  ADMIN_STATEDETAIL_SUCCESS,
  ADMIN_STATELIST_FAIL,
  ADMIN_STATELIST_REQUEST,
  ADMIN_STATELIST_SUCCESS,
  ADMIN_STATESTATUS_FAIL,
  ADMIN_STATESTATUS_REQUEST,
  ADMIN_STATESTATUS_SUCCESS,
  ADMIN_UPDATECITY_FAIL,
  ADMIN_UPDATECITY_REQUEST,
  ADMIN_UPDATECITY_RESET,
  ADMIN_UPDATECITY_SUCCESS,
  ADMIN_UPDATECOUNTRY_FAIL,
  ADMIN_UPDATECOUNTRY_REQUEST,
  ADMIN_UPDATECOUNTRY_RESET,
  ADMIN_UPDATECOUNTRY_SUCCESS,
  ADMIN_UPDATESTATE_FAIL,
  ADMIN_UPDATESTATE_REQUEST,
  ADMIN_UPDATESTATE_RESET,
  ADMIN_UPDATESTATE_SUCCESS,
} from "../constants/adminConstants.js";

export const cityListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CITYLIST_REQUEST:
      return { loading: true };
    case ADMIN_CITYLIST_SUCCESS:
      return {
        loading: false,
        cities: action.payload,
      };
    case ADMIN_CITYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cityCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDCITY_REQUEST:
      return { loading: true };
    case ADMIN_ADDCITY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDCITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDCITY_RESET:
      return {};
    default:
      return state;
  }
};

export const cityDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETECITY_REQUEST:
      return { loading: true };
    case ADMIN_DELETECITY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETECITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cityDetailReducer = (state = { city: {} }, action) => {
  switch (action.type) {
    case ADMIN_CITYDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_CITYDETAIL_SUCCESS:
      return {
        loading: false,
        city: action.payload,
      };
    case ADMIN_CITYDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cityStatusUpdateReducer = (state = { city: {} }, action) => {
  switch (action.type) {
    case ADMIN_CITYSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_CITYSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_CITYSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const cityUpdateReducer = (state = { city: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATECITY_REQUEST:
      return { loading: true };
    case ADMIN_UPDATECITY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATECITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATECITY_RESET:
      return { city: {} };
    default:
      return state;
  }
};

export const countryListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_COUNTRYLIST_REQUEST:
      return { loading: true };
    case ADMIN_COUNTRYLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        countries: action.payload,
      };
    case ADMIN_COUNTRYLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const countryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDCOUNTRY_REQUEST:
      return { loading: true };
    case ADMIN_ADDCOUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDCOUNTRY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDCOUNTRY_RESET:
      return {};
    default:
      return state;
  }
};

export const countryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETECOUNTRY_REQUEST:
      return { loading: true };
    case ADMIN_DELETECOUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETECOUNTRY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const countryDetailReducer = (state = { country: {} }, action) => {
  switch (action.type) {
    case ADMIN_COUNTRYDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_COUNTRYDETAIL_SUCCESS:
      return {
        loading: false,
        country: action.payload,
      };
    case ADMIN_COUNTRYDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const countryStatusUpdateReducer = (state = { country: {} }, action) => {
  switch (action.type) {
    case ADMIN_COUNTRYSTATUS_REQUEST:
      return { loading: true };
    case ADMIN_COUNTRYSTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_COUNTRYSTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const countryUpdateReducer = (state = { country: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATECOUNTRY_REQUEST:
      return { loading: true };
    case ADMIN_UPDATECOUNTRY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATECOUNTRY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATECOUNTRY_RESET:
      return { country: {} };
    default:
      return state;
  }
};

export const stateListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_STATELIST_REQUEST:
      return { loading: true };
    case ADMIN_STATELIST_SUCCESS:
      return {
        loading: false,
        states: action.payload,
      };
    case ADMIN_STATELIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const stateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADDSTATE_REQUEST:
      return { loading: true };
    case ADMIN_ADDSTATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_ADDSTATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ADDSTATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETESTATE_REQUEST:
      return { loading: true };
    case ADMIN_DELETESTATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETESTATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const stateDetailReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case ADMIN_STATEDETAIL_REQUEST:
      return { loading: true };
    case ADMIN_STATEDETAIL_SUCCESS:
      return {
        loading: false,
        state: action.payload,
      };
    case ADMIN_STATEDETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const stateStatusUpdateReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case ADMIN_STATESTATUS_REQUEST:
      return { loading: true };
    case ADMIN_STATESTATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_STATESTATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const stateUpdateReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATESTATE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATESTATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATESTATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATESTATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};
