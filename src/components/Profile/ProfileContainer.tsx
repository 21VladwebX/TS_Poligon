import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { ProfileType } from '../../types/common';
import { AppStateType } from '../../redux/redux-store';

type MatchType = {
    params: {
        userId: number
    } 
}

type MapStateToPropsType = {
    authorizedUserId: number
    profile: ProfileType
    status: string
    history: Array<string>
    match: MatchType
}

type MapDispatchToPropsType = {
    savePhoto: (photo: File) => void
    saveProfile: (data: HTMLInputElement) => Promise<any>
    updateStatus: (status: string) => void
    getUserProfile: (id: number) => void
    getStatus: (id: number) => void
}

type StateType = MatchType


type PropsType = MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType, StateType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.match.params.userId != prevProps.match.params.userId ) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state:AppStateType) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);




