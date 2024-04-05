import { configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
let userdata = createSlice({
    name : "userdata",
    initialState : {
        userId : "",
        username : "",
        displayName : "",
        loginCheck : false
    },
    reducers : {
        getUserdata(state){
            axios.get("http://localhost:8080/api/userdata/all", {
                withCredentials : true
            }).then((result)=>{
                    state.userId = result.data.userdata.id;
                    state.username = result.data.userdata.username;
                    state.displayName = result.data.userdata.displayName;
                    state.loginCheck = result.data.loginCheck;
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
})
export let { changeUserdata } = userdata.actions
export default configureStore({
  reducer: { 
    userdata : userdata.reducer 
   }
}) 