import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
function Detail() {
    let {id} = useParams();
    let navigate = useNavigate();
    let [item, setItem] = useState();
    let [username, setUsername] = useState();
    let [count , setCount] = useState(true);
    let [like, setLike] = useState(0);
    console.log(username);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail/${id}`)
            .then((result)=>{
                console.log(result.data)
                setItem(result.data)
            }).catch((e)=>{
                console.log(`아이템 세부정보 가져오면서 에러남 ${e}`)
        })
    }, []);
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
            navigate("/list")
        }).catch((e)=>{
            console.log(`아이템 삭제하면서 에러남 ${e}`)
        })
    }
    const likeFnc = () =>{
        if ( count == true) {
            setLike(like + 1)
            setCount(false)
            axios.post(`http://localhost:8080/api/like/add`,{
                withCredentials: true
            }).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log(`좋아요 누르면서 에러남 ${error}`);
            })
        } else if(count == false) {
            setLike(like - 1)
            setCount(true)
            axios.delete("http://localhost:8080/api/like/cancel",{
                withCredentials : true
            }).then((result)=>{
                console.log(result);
            }).catch((error)=>{
                console.log(`좋아요 취소하면서 에러남 ${error}`);
            })
        }
    }
    return (
        <div>
            <Header></Header>
            <div className="detail">
                <h4>상세페이지</h4>
                <div className="detailImgBox">
                    {item && item.imageUrl  ? <img src={item && item.imageUrl} id="detailImg" alt={"item"}/> :  <img src="https://placehold.co/300" alt={"item"}/>}
                </div>
                <h4>{item && item.title}</h4>
                <p>{item && item.price}원</p>
                <p onClick={likeFnc}>👍<span>{like}</span></p>
                {
                item && item.writer === username ? <><button onClick={()=>{navigate(`../edit/${id}`)}}>수정</button>&nbsp;<button onClick={deleteItem}>삭제</button></> : <></>
                }
            </div>
        </div>
    );
}

export default Detail;