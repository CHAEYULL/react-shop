/* eslint-disable no-restricted-globals */
import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from "axios";
const initState = {
    start : "",
    end  : "",
    last : "",
    pageNumList : "",
    items : [],
}
function List() {
    let [list, setList] = useState(initState)
    let {id} = useParams();
    let itemList = useQuery(['게시물 가져오는 쿼리'],()=>{
        return axios.get(`http://localhost:8080/api/list/${id}`)
        .then((result)=>{
            setList(result.data)
            
        }).catch((e)=>{
            console.log(`아이템 리스트 가져오면서 에러남 ${e}`)
    })
    })

    return (
        <div>
            <Header></Header>
            {
                list.items.content && list.items.content.map((a,i)=>{
                    return (
                        <div key={i} className="card">
                            {list.items.content[i].imageUrl ?  <img src={list.items.content[i].imageUrl} alt={"item"}/> : <img src="https://placehold.co/300" alt={"item"}/>}
                            <div>
                                <Link to={`/detail/${list.items.content[i].id}`}><h4>{list.items.content[i].title}</h4></Link>
                                <p>{list.items.content[i].price}원</p>
                            </div>
                        </div>
                    )
                })
            }
             {/************** 페이지 네이션 버튼 *****************/}
            {
                id <= 10 ? <></> : <button onClick={()=>{location.replace(`/list/1`)}}>{"<<"}</button>
            }
            {
                list.pageNumList && list.pageNumList.map((a,i)=>{
                    return (
                    <button key={i} onClick={()=>{location.replace(`/list/${a}`)}}>{a}</button>
                    )
                })
            }
            {
              list.last < list.end ? <></>:  <button onClick={()=>{location.replace(`/list/${list.last}`)}}>{">>"}</button>  
            }
           
        </div>
    );
}

export default List;