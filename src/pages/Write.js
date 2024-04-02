import React, {useState} from 'react';
import '../App.css'
import Header from '../component/Header'
import {useNavigate} from "react-router-dom";
import axios from "axios";
const initState = {
    id : '',
    title : '',
    price : ''
}
function Write() {
    let navigate = useNavigate();
    let [item, setItem] = useState(initState);
    const inputChange = (e) => {
        item[e.target.name] = e.target.value
        setItem({...item})
    }
    const addItem = ()=> {
        axios.post('http://localhost:8080/api/add', item)
            .then((result)=>{
            console.log(result.data)
                navigate("/list")
        }).catch((e)=>{
            console.log(`아이템 추가하면서 오류 생김 ${e}`)
        })
    }
    return (
        <div>
            <Header></Header>
                <input onChange={inputChange} type="text" name="title"/>
                <input onChange={inputChange} type="text" name="price"/>
                <button onClick={addItem}  type="submit">전송</button>
        </div>
    );
}

export default Write;