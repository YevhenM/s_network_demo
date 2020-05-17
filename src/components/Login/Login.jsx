import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from './../common/FormsControls/FormsControl.module.css'
import ss from './Login.module.css'





const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'} component={Input} validate={required}/>
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} component={Input} validate={required} type={'password'}/>
                </div>
                <div>
                    <Field component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
                </div>
                { props.error && <div className={s.formSummaryError}>{props.error}</div> }
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>

    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div className={ss.loginBox}>
        <div></div>
        <div className={ss.item}>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
        <div></div>
    </div>
}


const mapStateToProps =(state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);