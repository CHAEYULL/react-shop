import React, {useEffect, useState} from 'react';
import Header from '../component/Header'
import {Link, useParams} from 'react-router-dom'
import axios from "axios";
function List() {
    let [item, setItem] = useState();
    let {id} = useParams();
    useEffect(() => {
            axios.get(`http://localhost:8080/api/list/${id}`)
            .then((result)=>{
                console.log(result)
                setItem([...result.data])
            }).catch((e)=>{
                console.log(`아이템 리스트 가져오면서 에러남 ${e}`)
        })
    }, []);
    return (
        <div>
            <Header></Header>
            {
                item && item.map((a,i)=>{
                    return (
                        <div key={i} className="card">
                            <img src="https://placehold.co/300" alt={"item"}/>
                            <div>
                                <Link to={`/detail/${item[i].id}`}><h4>{item[i].title}</h4></Link>
                                <p>{item[i].price}원</p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default List;