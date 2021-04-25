import {
    ADMIN_ADDPAGE_REQUEST,
    ADMIN_ADDPAGE_SUCCESS,
    ADMIN_ADDPAGE_FAIL,
    ADMIN_PAGELIST_REQUEST,
    ADMIN_PAGELIST_SUCCESS,
    ADMIN_PAGELIST_FAIL,
    ADMIN_ADDPAGE_RESET,
    ADMIN_PAGESTATUS_REQUEST,
    ADMIN_PAGESTATUS_SUCCESS,
    ADMIN_PAGESTATUS_FAIL,
} from '../constants/adminConstants';

export const pageListReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_PAGELIST_REQUEST:
            return {loading: true}
        case ADMIN_PAGELIST_SUCCESS:
            return {
                loading: false,
                pages: action.payload
            }
        case ADMIN_PAGELIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const pageCreateReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_ADDPAGE_REQUEST:
            return {loading: true}
        case ADMIN_ADDPAGE_SUCCESS: 
            return {
                loading: false,
                success: true
            }
        case ADMIN_ADDPAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADMIN_ADDPAGE_RESET: 
            return {}
        default:
            return state;
    }
}

export const pageStatusReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_PAGESTATUS_REQUEST:
            return {loading: true}
        case ADMIN_PAGESTATUS_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ADMIN_PAGESTATUS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}