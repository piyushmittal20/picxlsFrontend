import {
    ADMIN_POSTLIST_REQUEST,
    ADMIN_POSTLIST_SUCCESS,
    ADMIN_POSTLIST_FAIL,
    ADMIN_POSTDETAIL_REQUEST,
    ADMIN_POSTDETAIL_SUCCESS,
    ADMIN_POSTDETAIL_FAIL,
    ADMIN_POSTDELETE_REQUEST,
    ADMIN_POSTDELETE_SUCCESS,
    ADMIN_POSTDELETE_FAIL,
    ADMIN_POSTSTATUS_REQUEST,
    ADMIN_POSTSTATUS_SUCCESS,
    ADMIN_POSTSTATUS_FAIL,
} from '../constants/adminConstants';

export const listPostReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_POSTLIST_REQUEST:
            return {loading: true}
        case ADMIN_POSTLIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload
            }
        case ADMIN_POSTLIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const postDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_POSTDELETE_REQUEST:
            return {loading: true}
        case ADMIN_POSTDELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ADMIN_POSTDELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const postStatusReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_POSTSTATUS_REQUEST:
            return {loading: true}
        case ADMIN_POSTSTATUS_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ADMIN_POSTSTATUS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}