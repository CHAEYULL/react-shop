import React, {useState} from 'react';
import '../App.css'
import Header from '../component/Header'
import {useNavigate} from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
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
=======
import { useQuery } from 'react-query';
function Write() {
    let navigate = useNavigate();
    //로그인된 유저 이름 초기화
    let [writer, setWriter] = useState();
    let findUsername = useQuery(['유저 이름 가져오는 쿼리'],()=>{
        return fetch("http://localhost:8080/api/userdata",{
            method : 'GET',
            mode : 'cors',
            credentials : 'include'
        }).then((result)=>{return result.json()})
        .then((result)=>{
            setWriter(result.username)
        }).catch((e)=>{
            console.log(`유저 이름 불러오다가 에러남${e}`)
            setWriter("")
        })
    })
    //아이템 이름 초기화
    let [title, setTitle] = useState();
    //아이템 가격 초기화
    let [price, setPrice] = useState();
    //이미지 url 
    let [imgUrl, setImgUrl] = useState();
    // 모달 창 상태
    let [modal, setModal] = useState();
    let item = {
        id  : "",
        title : title,
        price : price,
        imageUrl : imgUrl,
        writer: writer
    }
    let getURL = async function(e){
        const {
            target: {files},
          } = e;
        let name = encodeURIComponent(files[0].name)
        let result = await axios.get(`http://localhost:8080/api/presigned-url?filename=${name}`,{
            withCredentials: true
        })
        result = await result.data;
        let imagePut = await fetch(result, {
            method : 'PUT',
            body : files[0]
        })
        console.log(imagePut);
        console.log(imagePut.url.split("?")[0]);
        if(imagePut.ok){
            setImgUrl(imagePut.url.split("?")[0])
        }
    }
    //버튼 누르면 아이템 정보 서버로 보내는 함수
    const addItem = ()=> {
        axios.post('http://localhost:8080/api/add',item)
            .then((result)=>{
            console.log(result.data)
                navigate("/list/1")
>>>>>>> websockettest
        }).catch((e)=>{
            console.log(`아이템 추가하면서 오류 생김 ${e}`)
        })
    }
<<<<<<< HEAD
    return (
        <div>
            <Header></Header>
                <input onChange={inputChange} type="text" name="title"/>
                <input onChange={inputChange} type="text" name="price"/>
=======

    return (
        <div>
            <Header></Header>
                <p>이미지</p>
                {
                    imgUrl ? <img src={imgUrl} width={"400px"}/> :<></>
                }
                <input type="file" onChange={getURL}/>
                <p>제목</p>
                <input onChange={(e)=>{setTitle(e.target.value)}} type="text" name="title"/>
                <p>가격</p>
                <input onChange={(e)=>{setPrice(e.target.value)}} type="text" name="price"/>
>>>>>>> websockettest
                <button onClick={addItem}  type="submit">전송</button>
        </div>
    );
}

export default Write;