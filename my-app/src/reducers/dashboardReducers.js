import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAIL,
} from "../constants/adminConstants";

export const adminDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_REQUEST:
      return { loading: true };
    case ADMIN_DASHBOARD_SUCCESS:
      return {
        loading: false,
        total: action.total,
        last24Hour: action.last24,
        last7Day: action.last7,
        last14Day: action.last14,
        last28Day: action.last28,
      };
    case ADMIN_DASHBOARD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
