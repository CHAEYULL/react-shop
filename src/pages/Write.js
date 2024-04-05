import React, {useState} from 'react';
import '../App.css'
import Header from '../component/Header'
import {useNavigate} from "react-router-dom";
import axios from "axios";
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
        writer: writer,
        createdDate : new Date(),
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
    const addItem = (e)=> {
        if (title == "" || title == null){
            e.preventDefault();
            alert("제목을 안적으셨습니다")
        } else if (price == "" || price == null){
            e.preventDefault();
            alert("가격을 안적으셨습니다")
        } else if( price < 0){
            e.preventDefault();
            alert("음수를 적으셨습니다")
        } else {
            axios.post('http://localhost:8080/api/add',item)
            .then((result)=>{
            console.log(result.data)
                navigate("/list/1")
        }).catch((e)=>{
            console.log(`아이템 추가하면서 오류 생김 ${e}`)
        })
        }
    }
    console.log(item)
    return (
        <div>
            <Header></Header>
                <p>이미지</p>
                {
                    imgUrl ? <img src={imgUrl} width={"400px"}/> :<></>
                }
                <input type="file" onChange={getURL}/>
                <p>제목</p>
                <input  onChange={(e)=>{setTitle(e.target.value)}} type="text" name="title"/>
                <p>가격</p>
                <input onChange={(e)=>{setPrice(e.target.value)}} type="text" name="price"/>
                <button onClick={addItem}  type="submit">전송</button>
        </div>
    );
}

export default Write;