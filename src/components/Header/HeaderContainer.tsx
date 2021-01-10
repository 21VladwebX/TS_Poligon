import React, { FC } from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';



const HeaderContainer: FC= (props: any) => ( <Header {...props} /> )

type MapStateToPropsType = {
    isAuth: boolean | null
    login: string | null
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapStateToPropsType, {},{}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);