import Header from '../component/Header'
import { useEffect } from 'react';
import axios from 'axios';
function Mypage() {
    useEffect(()=>{
        axios.get("http://localhost:8080/api/mypage")
        .then((result)=>{
            console.log(result)
        }).catch((e)=>{
            console.log(`유저 정보를 불러오면서 오류남 ${e}`)
        })
    },[])
    return (
    <div>
        <Header></Header>
   
    </div>
    )
}
export default Mypage