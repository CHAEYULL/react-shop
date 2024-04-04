import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {useParams , useNavigate} from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
function Detail() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [item, setItem] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                // console.log(result.data)
=======
import { useQuery } from 'react-query';
function Detail() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [item, setItem] = useState();
    let [username, setUsername] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                console.log(result.data)
>>>>>>> websockettest
                setItem(result.data)
            }).catch((e)=>{
                console.log(`아이템 세부정보 가져오면서 에러남 ${e}`)
        })
    }, []);
<<<<<<< HEAD
    const deleteItem = () => {
        axios.delete(`http://localhost:8080/api/delete?id=${id}`)
        .then((result)=>{
            console.log(result)
=======
    let getUsername = useQuery(['유저 이름 가져오는 쿼리'],()=>{
        axios.get('http://localhost:8080/api/userdata',{
            withCredentials: true
        }).then((result)=>{
            // console.log(result.data.username)
            setUsername(result.data.username)
        }).catch((e)=>{
            setUsername(undefined)
        })
    })
    const deleteItem = () => {
        axios.delete(`http://localhost:8080/api/delete?id=${id}`)
        .then((result)=>{
            // console.log(result)
>>>>>>> websockettest
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
<<<<<<< HEAD
                <img src={"https://placehold.co/300"} alt={"item"}/>
                <h4>{item && item.title}</h4>
                <p>{item && item.price}</p>
                <button onClick={()=>{navigate(`../edit/${id}`)}}>수정</button>
                <button onClick={deleteItem}>삭제</button>
=======
                <div className="detailImgBox">
                    {item && item.imageUrl  ? <img src={item && item.imageUrl} id="detailImg" alt={"item"}/> :  <img src="https://placehold.co/300" alt={"item"}/>}
                </div>
                <h4>{item && item.title}</h4>
                <p>{item && item.price}원</p>
                <p>👍<span>0</span></p>
                {
                item && item.writer === username ? <><button onClick={()=>{navigate(`../edit/${id}`)}}>수정</button>&nbsp;<button onClick={deleteItem}>삭제</button></> : <></>
                }
>>>>>>> websockettest
            </div>
        </div>
    );
}

export default Detail;