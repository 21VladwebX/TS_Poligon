import {profileAPI, usersAPI} from "../api/api";
import {ActionTypes, FormAction, stopSubmit} from "redux-form";

import { PhotoType, PostType, ProfileType } from "../types/common";
import { Dispatch } from 'redux';
import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
        ] as Array<PostType>,
    profile: {} as  ProfileType,
    status: "" as string,
    newPostText: "" as string,
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case SAVE_PHOTO_SUCCESS:
            // debugger;
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

type ActionsType = AddPostActionCreatorType | SetUserProfileType 
                | SetStatusType | DeletePostType | SavePhotoSuccessType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText:string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status:string): SetStatusType => ({type: SET_STATUS, status})

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId:number): DeletePostType => ({type: DELETE_POST, postId})

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: Array<PhotoType>
}
export const savePhotoSuccess = (photos:Array<PhotoType>): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

type DispatchType = Dispatch<ActionsType>

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId:number): ThunkActionType => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId:number): ThunkActionType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status:string): ThunkActionType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch(error) {
        //
    }
}
export const savePhoto = (file: any): ThunkActionType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType): ThunkActionType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0 && userId !== null) {
        dispatch(getUserProfile(userId));
    } else {
        // dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;