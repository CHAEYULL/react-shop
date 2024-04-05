import React ,{useEffect} from 'react';
// import { useSelector } from "react-redux"
import Header from '../component/Header'
import axios from 'axios';
function Index() {
    // let a = useSelector((state) => { return state } )
    // console.log(a)
    // let servicekey = "V%2BAIucYbXZxnp2WvPRul11%2Bx3WhP5T2PFHv8goaSVtEqhUxJQvNa6sOcHh7vnhVxz%2BrA88QnpXMEXlj66yhQCQ%3D%3D"
    
    // useEffect(()=>{
    //     fetch(`https://api.odcloud.kr/api/15003673/v1/uddi:e758bbdd-882d-45de-81c4-e047ec36561d?serviceKey=${servicekey}`,{
    //         method : 'GET'
    //     }).then((r)=>{return r.json()})
    //     .then((result)=>{
    //         console.log(result.data[0])
    //     }).catch((e)=>{
    //         console.log(e)
    //     })
    // },[])
    useEffect(()=>{
        axios.get("http://localhost:8080/api/userdata/all", {
            withCredentials : true
        }).then((result)=>{
            console.log(result.data.userdata);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    return (
        <div>
            <Header></Header>
        </div>
    );
}

export default Index;