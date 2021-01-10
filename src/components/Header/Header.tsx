import React, {FC} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropTypes = {
    login: string
    isAuth: boolean
    logout: ()=> void
}
const Header: FC<PropTypes> = (props) => {
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

        <div className={s.loginBlock}>
            { props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;