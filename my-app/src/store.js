import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { adminLoginReducer } from "./reducers/authReducers";

import {
  pageListReducer,
  pageCreateReducer,
  pageStatusReducer,
} from "./reducers/cmsReducers";

import {
  countryListReducer,
  countryCreateReducer,
  countryDeleteReducer,
  countryDetailReducer,
  countryUpdateReducer,
  stateListReducer,
  stateCreateReducer,
  stateDeleteReducer,
  stateDetailReducer,
  stateUpdateReducer,
  cityListReducer,
  cityCreateReducer,
  cityDeleteReducer,
  cityDetailReducer,
  cityUpdateReducer,
  countryStatusUpdateReducer,
  cityStatusUpdateReducer,
  stateStatusUpdateReducer,
} from "./reducers/masterSettings";

import {
  startagListReducer,
  createStartagReducer,
  startagDeleteReducer,
  startagDetailReducer,
  startagUpdateReducer,
  startagStatusReducer,
  startagReportlistReducer,
} from "./reducers/startagReducers";

import {
  userListReducer,
  userCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  updateUserReducer,
  requestListReducer,
  requestDetailReducer,
  userVerifyingReducer,
  userDroppingReducer,
  userStatusReducer,
  reportListReducer,
  reportStatusReducer,
} from "./reducers/userReducers.js";

import {
  listPostReducer,
  postDetailReducer,
  postDeleteReducer,
  postStatusReducer,
  listReportReducer,
  statusUpdateReducer,
} from "./reducers/postReducers";

import { adminDashboardReducer } from "./reducers/dashboardReducers";

import {
  deleteTaxReducer,
  listTaxReducer,
  taxCreateReducer,
  taxDetailReducer,
  taxStatusReducer,
  taxUpdateReducer,
} from "./reducers/taxReducers";

import {
  listContactReducer,
  detailContactReducer,
  statusContactReducer,
  answerConcernReducer,
} from "./reducers/contactReducers";
import {
  detailCommentReducer,
  detailReplyReducer,
  listCommentReducer,
  listReplyReducer,
  statusUpdateCommentReducer,
} from "./reducers/abuseReducers";
import {
  logoDetailReducer,
  logoListReducer,
  logoUpdateReducer,
  pannelLogoReducer,
  titleLogoReducer,
} from "./reducers/logoReducers";
import {
  notificationCreateReducer,
  notificationDetailReducer,
  notificationEditReducer,
  notificationListReducer,
} from "./reducers/notificationReducers";

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  pageList: pageListReducer,
  pageCreate: pageCreateReducer,
  countryList: countryListReducer,
  countryCreate: countryCreateReducer,
  countryDelete: countryDeleteReducer,
  countryDetail: countryDetailReducer,
  countryUpdate: countryUpdateReducer,
  countryStatusUpdate: countryStatusUpdateReducer,
  stateList: stateListReducer,
  stateCreate: stateCreateReducer,
  stateDelete: stateDeleteReducer,
  stateDetail: stateDetailReducer,
  stateStatusUpdate: stateStatusUpdateReducer,
  stateUpdate: stateUpdateReducer,
  cityList: cityListReducer,
  cityCreate: cityCreateReducer,
  cityDelete: cityDeleteReducer,
  cityDetail: cityDetailReducer,
  cityStatusUpdate: cityStatusUpdateReducer,
  cityUpdate: cityUpdateReducer,
  startagList: startagListReducer,
  startagCreate: createStartagReducer,
  startagDelete: startagDeleteReducer,
  startagDetail: startagDetailReducer,
  startagUpdate: startagUpdateReducer,
  startagReports: startagReportlistReducer,
  userList: userListReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  requestList: requestListReducer,
  requestDetail: requestDetailReducer,
  userVerifying: userVerifyingReducer,
  userDropping: userDroppingReducer,
  pageStatus: pageStatusReducer,
  startagStatus: startagStatusReducer,
  userStatus: userStatusReducer,
  listPost: listPostReducer,
  postDelete: postDeleteReducer,
  postStatus: postStatusReducer,
  postDetail: postDetailReducer,
  listReport: listReportReducer,
  statusUpdate: statusUpdateReducer,
  reportList: reportListReducer,
  reportStatus: reportStatusReducer,
  adminDashboard: adminDashboardReducer,
  listTax: listTaxReducer,
  taxDetail: taxDetailReducer,
  taxStatus: taxStatusReducer,
  taxUpdate: taxUpdateReducer,
  deleteTax: deleteTaxReducer,
  taxCreate: taxCreateReducer,
  listContact: listContactReducer,
  detailContact: detailContactReducer,
  statusContact: statusContactReducer,
  answerConcern: answerConcernReducer,
  logoList: logoListReducer,
  logoDetail: logoDetailReducer,
  logoUpdate: logoUpdateReducer,
  pannelLogo: pannelLogoReducer,
  titleLogo: titleLogoReducer,
  notificationCreate: notificationCreateReducer,
  notificationDetail: notificationDetailReducer,
  notificationList: notificationListReducer,
  notificationEdit: notificationEditReducer,
  listComment: listCommentReducer,
  detailComment: detailCommentReducer,
  statusUpdateComment: statusUpdateCommentReducer,
  listReply: listReplyReducer,
  detailReply: detailReplyReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
  titleLogo: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
