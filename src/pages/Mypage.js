import Header from '../component/Header'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
function Mypage() {
    let [item, setItem] = useState();
    let writerList = useQuery(['해당 유저 게시물만 보내달라고 요청하는 쿼리'],()=>{
        return axios.get('http://localhost:8080/api/mypage',{
            withCredentials: true
        })
        .then((result)=>{
            setItem(result.data)
        }).catch((e)=>{
            console.log(e)
        })
    })
  

    return (
    <div>
        <Header></Header>
        {
            item && item.map((a,i)=>{
                return (
                    <div key={i} className="card">
                           { item[i].imageUrl ?<img src={item[i].imageUrl} alt={"https://placehold.co/300"}/> : <img src="https://placehold.co/300" alt={"item"}/> }
                        
                        <div>
                            <Link to={`/detail/${item[i].id}`}><h4>{item[i].title}</h4></Link>
                            <p>{item[i].price}원</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}
export default Mypage