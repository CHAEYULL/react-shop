import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
const initState = {
    id : '',
    title : '',
    price : ''
}
function Edit() {
    let {id} = useParams();
    let [item, setItem] = useState(initState);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                console.log(result.data)
                setItem(result.data)
            }).catch((e)=>{
                console.log(`아이템 수정 정보 가져오면서 오류남 ${e}`)
        })
    }, []);
    const editItem = () => {
        axios.post(`http://localhost:8080/api/edit/${id}`,item)
        .then((result)=>{
            console.log(result)
            navigate(`/detail/${id}`)
        }).catch((e)=>{
            console.log(`수정하면서 오류 생김 ${e}`)
        })
    }
    const inputChange = (e) => {
        item[e.target.name] = e.target.value
        setItem({...item})
    }

    return (
        <div>
            <Header></Header>
                <input onChange={inputChange} name="id" value={item.id}/>
                <input onChange={inputChange} name="title" value={item.title}/>
                <input onChange={inputChange} name="price" value={item.price}/>
                <button onClick={editItem} type="submit">수정</button>
        </div>
    );
}

export default Edit;