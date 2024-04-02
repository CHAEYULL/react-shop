/* eslint-disable no-restricted-globals */
import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from "axios";

function List() {
    let [item, setItem] = useState();
    let [page, setPage] = useState();
    let {id} = useParams();
    let navigate = useNavigate();
    let itemList = useQuery(['게시물 가져오는 쿼리'],()=>{
        return axios.get(`http://localhost:8080/api/list/${id}`)
        .then((result)=>{
            console.log(result.data)
            setItem([...result.data.items.content])
            setPage(result.data.items.size)
        }).catch((e)=>{
            console.log(`아이템 리스트 가져오면서 에러남 ${e}`)
    })
    })
    // console.log(item.sort())
    return (
        <div>
            <Header></Header>
            {
                item && item.map((a,i)=>{
                    return (
                        <div key={i} className="card">
                            {item[i].imageUrl ?  <img src={item[i].imageUrl} alt={"item"}/> : <img src="https://placehold.co/300" alt={"item"}/>}
                            <div>
                                <Link to={`/detail/${item[i].id}`}><h4>{item[i].title}</h4></Link>
                                <p>{item[i].price}원</p>
                            </div>
                        </div>
                    )
                })
            }

            {
                item && item.map((a,i)=>{
                    return (
                    <button key={i} onClick={()=>{location.replace(`/list/${i}`)}}>{i + 1}</button>
                    )
                })
            }

        </div>
    );
}

export default List;