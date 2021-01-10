import React, {FC, FormEventHandler} from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import { connect } from 'react-redux';
import { login, getCaptchaUrl } from '../../redux/auth-reducer';
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';

type LoginFormPropsType = {
    error: string
    captchaUrl: string
    handleSubmit: (data: any) => void
}

// const LoginForm: FC<LoginFormPropsType> = ({handleSubmit, error, captchaUrl}) => {
class LoginForm extends React.Component<LoginFormPropsType> {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                {createField("Email", "email", [required], Input)}
                {createField("Password", "password", [required], Input, {type: "password"})}
                {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
    
                { this.props.captchaUrl && <img src={this.props.captchaUrl} />}
                { this.props.captchaUrl &&  createField("Symbols from image", "captcha", [required], Input, {}) }
    
    
                {this.props.error && <div className={style.formSummaryError}>
                    {this.props.error}
                </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

type MapStateToProps = {
    captchaUrl: string | null,
    isAuth: boolean | null
}

type MapDispatchToProps = {
    onSubmit: (event: FormEventHandler<HTMLFormElement> )=> void
    login: (email: string | null, password: string | null, rememberMe: boolean | null, captcha: boolean ) => void
}

type FormDataType = {
    email: string | null
    password: string | null
    rememberme: boolean | null
    captcha: boolean 
    rememberMe: boolean | null
}

type PropsType = MapStateToProps & MapDispatchToProps

const Login:FC<PropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {login})(Login);