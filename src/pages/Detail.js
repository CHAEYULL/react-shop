import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {useParams , useNavigate} from "react-router-dom";
import axios from "axios";
function Detail() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [item, setItem] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                // console.log(result.data)
                setItem(result.data)
            }).catch((e)=>{
                console.log(`아이템 세부정보 가져오면서 에러남 ${e}`)
        })
    }, []);
    const deleteItem = () => {
        axios.delete(`http://localhost:8080/api/delete?id=${id}`)
        .then((result)=>{
            console.log(result)
            navigate("/list")
        }).catch((e)=>{
            console.log(`아이템 삭제하면서 에러남 ${e}`)
        })
    }
    return (
        <div>
            <Header></Header>
            <div className="detail">
                <h4>상세페이지</h4>
                <img src={"https://placehold.co/300"} alt={"item"}/>
                <h4>{item && item.title}</h4>
                <p>{item && item.price}</p>
                <button onClick={()=>{navigate(`../edit/${id}`)}}>수정</button>
                <button onClick={deleteItem}>삭제</button>
            </div>
        </div>
    );
}

export default Detail;