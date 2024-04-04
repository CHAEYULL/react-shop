<<<<<<< HEAD
import React from 'react';
import "../App.css"
import {Link} from 'react-router-dom'
function Header() {
=======
import React, {useState, useEffect} from 'react';
import "../App.css"
import {Link, useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query';

function Header() {
    let navigate = useNavigate();
    let [username, setUsername] = useState();
    let [login, setLogin] = useState(false);
>>>>>>> websockettest
    const doLogout = () => {
        fetch("http://localhost:8080/api/logout",{
            method  : 'POST',
        }).then((r)=>{return r.json()})
        .then((r)=>{
<<<<<<< HEAD
            console.log(r)
=======
            setLogin(false)
>>>>>>> websockettest
        }).catch((e)=>{
            console.log(`로그아웃 하는 중에 오류남 ${e}`)
        })
    }
<<<<<<< HEAD
    return (
        <div className="nav">
            <Link className="logo" to="/">SpringBlog</Link>
            <Link to="/list/0">List</Link>
            <Link to="/write">Write</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="http://localhost:8080/api/logout">Logout</Link>
=======
    let result = useQuery(['유저 로그인 되어있는지 확인하는 쿼리'],()=>{
        return fetch("http://localhost:8080/api/userdata",{
            method : 'GET',
            mode : 'cors',
            credentials : 'include'
        }).then((result)=>{return result.json()})
        .then((result)=>{
            if (result.status == 500) {
                setLogin(false)
                setUsername(undefined)
            } else {
                setLogin(true)
                setUsername(result.displayName)
            }
        }).catch(()=>{
            setUsername(undefined)
            setLogin(false)
        })
    })
    let moveToWrite = () => {
        if (login == false){
            alert("로그인이 필요한 서비스입니다.")
            navigate("/login")
        } else {
            navigate("/write")
        }
    }
    return (
        <div className="nav">
            <Link className="logo" to="/">SpringBlog</Link>
            <Link to="/list/1">List</Link>
            <div onClick={moveToWrite}>Write</div>
            &nbsp;&nbsp;
            {
                login === true ? <><Link to="http://localhost:8080/api/logout">Logout</Link><Link to="/mypage">{username}</Link></> : <><Link to="/register">Register</Link><Link to="/login">Login</Link></>
            }
>>>>>>> websockettest
        </div>
    );
}

export default Header;