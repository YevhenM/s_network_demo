import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from './icon.jpg'

const Header = (props) => {
    return (
    <header className={s.header}>
        <a href="/profile"><img src={logo} alt=""/></a>
        <h1>Face<span> book </span>palm</h1>
        <div className={s.loginBox}>

            {props.isAuth?  <div>{props.login} <span onClick={props.logout}>| Logout</span></div> : <NavLink to={'/login'}>Login</NavLink> }

            </div>
        </header>
    );    
}

export default Header;