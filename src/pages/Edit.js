import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
const initState = {
    id : '',
    title : '',
    price : '',
    imageUrl : '',
    writer: '',
}
function Edit() {
    let {id} = useParams();
    let [imgUrl, setImgUrl] = useState("");
    let [docid, setDocid] = useState("");
    let [title, setTitle] = useState("");
    let [price, setPrice] = useState("");
    let [writer, setWriter] = useState("");
    let item = {
        id : docid,
        title : title,
        price : price,
        imageUrl : imgUrl,
        writer : writer
    }
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                // console.log(result.data)
                // setItem(result.data)
                setDocid(result.data.id)
                setTitle(result.data.title)
                setPrice(result.data.price)
                setWriter(result.data.writer)
                setImgUrl(result.data.imageUrl)
            }).catch((e)=>{
                console.log(`아이템 수정 정보 가져오면서 오류남 ${e}`)
        })
    }, []);
    const editItem = () => {
        axios.post(`http://localhost:8080/api/edit/${id}?writer=${writer}`,item)
        .then((result)=>{
            // console.log(result)
            navigate(`/detail/${id}`)
        }).catch((e)=>{
            console.log(`수정하면서 오류 생김 ${e}`)
        })
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
        if(imagePut.ok){
            setImgUrl(imagePut.url.split("?")[0])
        }
    }
    console.log(writer)
    return (
        <div>
            <Header></Header>
                <img src={imgUrl && imgUrl} width={"400px"}/>
                <input type="file" onChange={getURL}/>
                <input onChange={(e)=>{setDocid(e.target.value)}} name="id" value={docid && docid} style={{display : 'none'}}/>
                <input onChange={(e)=>{setTitle(e.target.value)}} name="title" value={title && title}/>
                <input onChange={(e)=>{setPrice(e.target.value)}} name="price" value={price && price}/>
                <input onChange={(e)=>{setWriter(e.target.value)}} name="writer" value={writer && writer}/>
                <button onClick={editItem} type="submit">수정</button>
        </div>
    );
}

export default Edit;