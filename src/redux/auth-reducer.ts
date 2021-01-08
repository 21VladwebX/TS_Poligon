import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import { type } from "os";

let SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
let GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl: null as string | null// if null, then captcha is not required
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                userI2d: 'sad',
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetActionPayloadType = {
    userId: number|null,
    email: string|null,
    login: string|null,
    isAuth: boolean|null
} 

export type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetActionPayloadType
}

export const setAuthUserData = (userId: number|null, email: string|null, login: string|null, isAuth: boolean|null): SetAuthUserDataType  => ({
    type: SET_USER_DATA, 
    payload: {userId, email, login, isAuth}
});

export type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string   
    }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});


export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}



export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;