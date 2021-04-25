import {combineReducers, applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
    adminLoginReducer
} from './reducers/authReducers';

import {
    pageListReducer,
    pageCreateReducer,
    pageStatusReducer,
} from './reducers/cmsReducers';

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
    stateStatusUpdateReducer
} from './reducers/masterSettings';

import {
    startagListReducer,
    createStartagReducer,
    startagDeleteReducer,
    startagDetailReducer,
    startagUpdateReducer,
    startagStatusReducer,
} from './reducers/startagReducers';

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
} from './reducers/userReducers.js';

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
});

const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse
    ( localStorage.getItem('adminInfo')) : null

const initialState = {
    adminLogin: {adminInfo: adminInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;