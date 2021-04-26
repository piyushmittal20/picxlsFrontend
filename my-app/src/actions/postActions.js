import axios from 'axios';
import { FaThermometerEmpty } from 'react-icons/fa';

import {
    ADMIN_POSTLIST_REQUEST,
    ADMIN_POSTLIST_SUCCESS,
    ADMIN_POSTLIST_FAIL,
    ADMIN_POSTDETAIL_REQUEST,
    ADMIN_POSTDETAIL_SUCCESS,
    ADMIN_POSTDETAIL_FAIL,
    ADMIN_REPORTLIST_REQUEST,
    ADMIN_REPORTLIST_SUCCESS,
    ADMIN_REPORTLIST_FAIL,
    ADMIN_POSTDELETE_REQUEST,
    ADMIN_POSTDELETE_SUCCESS,
    ADMIN_POSTDELETE_FAIL,
    ADMIN_POSTSTATUS_REQUEST,
    ADMIN_POSTSTATUS_SUCCESS,
    ADMIN_POSTSTATUS_FAIL,
} from '../constants/adminConstants';
import { postDelete, postDetail, postList, postStatusUpdate } from '../service';

export const getAllPosts = () => async(dispatch, getState) => {
    try {
        dispatch({type: ADMIN_POSTLIST_REQUEST})

        const {data: {posts}} = await axios.get(`${postList}/posts`)

        dispatch({
            type: ADMIN_POSTLIST_SUCCESS,
            payload: posts
        })
    } catch (error) {
        dispatch({
            type: ADMIN_POSTLIST_FAIL,
            payload: error.response .data
        })
    }
}

export const getPost = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: ADMIN_POSTDETAIL_REQUEST})

        const {data: {post}} = await axios.get(`${postDetail}/post/${id}`)

        dispatch({
            type: ADMIN_POSTDETAIL_SUCCESS,
            payload: post
        })
    } catch (error) {
        dispatch({
            type: ADMIN_POSTDETAIL_FAIL,
            payload: error.resposne.data
        })
    }
}

export const deletePost = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: ADMIN_POSTDELETE_REQUEST})

        const {data} = await axios.delete(`${postDelete}/post/${id}`)

        dispatch({
            type: ADMIN_POSTDELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_POSTDELETE_FAIL,
            payload: error.response.data
        })
    }
}

export const updatePostStatus = (post, id) => async(dispatch, getState) => {
    try {
        dispatch({type: ADMIN_POSTSTATUS_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data: {updatedPost}} = await axios.put(`${postStatusUpdate}/postStatus/${id}`, post, config)

        dispatch({
            type: ADMIN_POSTSTATUS_SUCCESS,
            payload: updatedPost
        })
    } catch (error) {
        dispatch({
            type: ADMIN_POSTSTATUS_FAIL,
            payload: error.response.data
        })
    }
}