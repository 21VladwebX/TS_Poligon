import React from 'react';
import { sendMessageCreator, DialogType, MessageType } from '../../redux/dialogs-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>
        messages: Array<MessageType>
        newMessageBody: string
    }

}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
type MapDispatchToProps = {
    sendMessage: (newMessagwBody: string) => void
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);