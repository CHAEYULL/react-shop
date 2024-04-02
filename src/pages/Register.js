import Header from '../component/Header'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const initState = {
    id : '',
    username : '',
    displayName : '',
    password : '',
    passwordCheck : ''
}
function Register(){
    let navigate = useNavigate();
    let [member, setMember] = useState(initState)
    const inputChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
    }
    const addMember = () => {
        axios.post(`http://localhost:8080/api/register`,member)
        .then((result)=>{
            console.log(result)
            navigate("/")
        }).catch((e)=>{
            console.log(`회원가입하면서 오류남 ${e}`)
        })
    }
    return (
        <div>
            <div>
            <Header></Header>
                <p>이메일</p>
                <input onChange={inputChange} type="email"  name="username"/>
                <p>닉네임</p>
                <input onChange={inputChange} type="text" name="displayName"/>
                <p>비밀번호</p>
                <input onChange={inputChange} type="password" name="password"/>
                <p>비밀번호 확인</p>
                <input onChange={inputChange} type="password" name="passwordCheck"/>
                <button onClick={addMember} type="submit">전송</button>
            </div>
        </div>
    )
}
export default Register