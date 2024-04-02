import React from 'react';
import "../App.css"
import {Link} from 'react-router-dom'
function Header() {
    const doLogout = () => {
        fetch("http://localhost:8080/api/logout",{
            method  : 'POST',
        }).then((r)=>{return r.json()})
        .then((r)=>{
            console.log(r)
        }).catch((e)=>{
            console.log(`로그아웃 하는 중에 오류남 ${e}`)
        })
    }
    return (
        <div className="nav">
            <Link className="logo" to="/">SpringBlog</Link>
            <Link to="/list/0">List</Link>
            <Link to="/write">Write</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="http://localhost:8080/api/logout">Logout</Link>
        </div>
    );
}

export default Header;