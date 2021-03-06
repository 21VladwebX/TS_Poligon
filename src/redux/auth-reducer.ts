import { authAPI, ResultCodesEnum, securityAPI, ResultCodeForCaptcha } from '../api/api';
import { stopSubmit, ActionTypes } from 'redux-form';
import { type } from "os";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';

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

const authReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                userId: 'sad',
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionTypes = SetAuthUserDataType | GetCaptchaUrlSuccessType

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

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUserData = (): ThunkActionType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string): ThunkActionType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        // dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = (): ThunkActionType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}



export const logout = (): ThunkActionType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;