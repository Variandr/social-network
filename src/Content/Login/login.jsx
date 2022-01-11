import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import s from "./login.module.css";
import {LogIn} from "../../state/auth-reducer";
import {connect} from "react-redux";
import {ProfileRedirect} from "../../hoc/profileRedirect";
import {compose} from "redux";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/all";

const renderField = ({input, label, type, meta}) => {
    return <div>
        <div>
            <input className={meta.touched && meta.error ? s.error : s.input} {...input} placeholder={label}
                   type={type}/>
            {meta.touched && ((meta.error && <span>{meta.error}</span>) || (meta.warning &&
                <span>{meta.warning}</span>))}
        </div>
    </div>
}
const required = value => value ? undefined : 'Field is required';
const maxLength = maxLength => value => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;
const maxLength20 = maxLength(20);
const maxLength40 = maxLength(40);
const submitting = () => {

}
const LoginForm = (props) => {
    let [isVisible, setVisibility] = useState(false);
    const showPassword = () => setVisibility(true);
    const hidePassword = () => setVisibility(false);
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.group}>
                <Field className={s.input} component={renderField} name="email" placeholder="Login" label="Login"
                       type="text"
                       validate={[required, maxLength20]}/>
            </div>
            <div className={s.group}>
                    <Field className={s.input} component={renderField} name="password" placeholder="Password"
                           label="Password" type={isVisible ? "text" : "password"}
                           validate={[required, maxLength40]}/>
                <div className={s.visibilityBtn}>
                    {isVisible ? <div onClick={hidePassword}><AiFillEyeInvisible/></div> :
                        <div onClick={showPassword}><AiFillEye/></div>}
                </div>
            </div>
            <div>
                <Field component="input" name="rememberMe" type="checkbox"/>Remember me
            </div>
            <div>
                <button className={s.button_log} type="submit" disabled={submitting}>Login</button>
            </div>
            <div>
                {props.error}
            </div>
        </form>
    )
}
//login: korolaxa@gmail.com
//password: vfrcbv
const ReduxLoginForm = reduxForm({form: "login"})(LoginForm);
const Login = (props) => {
    const onSubmit = (formData) => {
        props.LogIn(formData.email, formData.password, formData.rememberMe);
    }
    return <div className={s.body}>
        <ReduxLoginForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.loginPage.isAuth
})
export default compose(ProfileRedirect, connect(mapStateToProps, {LogIn}))(Login);