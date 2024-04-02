import Header from '../component/Header'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const initState = {
    username : '',
    password : '',
}
function Login(){
    let navigate = useNavigate();
    let [member, setMember] = useState(initState)
    const inputChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
    }
    const doLogin = () => {
        let formData = new FormData();
        formData.append("username", member.username)
        formData.append("password",member.password)
        fetch("http://localhost:8080/api/login",{
            method : 'POST',
            credentials : 'include',
            // mode: 'cors',
            body : formData
        }).then((r)=>{r.text()})
        .then((r)=>{
            console.log(r)
            navigate("/")
        }).catch((e)=>{
            console.log(`로그인하면서 오류남 ${e}`);
        })
        // axios.post(`http://localhost:8080/api/login`, formData)
        // .then((result)=>{
        //     console.log(result);
        // }).catch((error)=>{
        //     console.log(`로그인하면서 오류남 ${error}`);
        // });
    }
    
    return (
        <div>
            <Header></Header>
            {/* <form> */}
            <input onChange={inputChange}  type="email" name="username"/>
            <input onChange={inputChange}  type="password" name="password"/>
            <button onClick={doLogin}  type="submit">로그인</button>
            {/* </form> */}
        </div>
    )
}
export default Login