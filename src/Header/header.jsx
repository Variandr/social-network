import React from 'react';
import s from './header.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = (props) => {
    debugger
    return (
        <div className={s.head}>
            <span className={s.log}>
                {props.isAuth ? props.login : <NavLink className={s.auth} to='/auth'>SignIn</NavLink>}
            </span>
            <span>
                <img className={s.logo} src={logo} alt={logo}/>
            </span>
        </div>
    )
}
export default Header;