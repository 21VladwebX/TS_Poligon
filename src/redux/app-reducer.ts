import {authAPI} from "../api/api";
import { stopSubmit, ActionTypes } from 'redux-form';
import {getAuthUserData, SetAuthUserDataType} from "./auth-reducer";
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';

let INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";


let initialState = {
    initialized: false as boolean | false,
    globalError: null as string | null
};

export type initialStateType = typeof initialState; 

const appReducer = (state = initialState, action: initializedSuccessType) : initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: Dispatch<initializedSuccessType>): Promise<void> => {
    let promise: any = dispatch(getAuthUserData());

    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;