import {createBrowserRouter} from "react-router-dom";
import { Suspense, lazy} from "react";
const Loading = <div>Loading..</div>
const Home = lazy(()=>import("../pages/Index"))
const List = lazy(()=>import("../pages/List"))
const Write = lazy(()=>import("../pages/Write"))
const Edit = lazy(()=>import("../pages/Edit"))
const Detail = lazy(()=>import("../pages/Detail"))
const Register = lazy(()=>import("../pages/Register"))
const Login = lazy(()=>import("../pages/Login"))
const Mypage = lazy(()=>import("../pages/Mypage"))
const root = createBrowserRouter([
    {
        path : "",
        element : <Suspense fallback={Loading}><Home/></Suspense>
    },
    {
        path : "/list/:id",
        element : <Suspense fallback={Loading}><List/></Suspense>
    },
    {
        path : "/write",
        element : <Suspense fallback={Loading}><Write/></Suspense>
    },
    {
        path : "/edit/:id",
        element : <Suspense fallback={Loading}><Edit/></Suspense>
    },
    {
        path : "detail/:id",
        element : <Suspense fallback={Loading}><Detail/></Suspense>
    },
    {
        path : "/register",
        element : <Suspense fallback={Loading}><Register/></Suspense>
    },
    {
        path : "/login",
        element : <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path : "/mypage",
        element : <Suspense fallback={Loading}><Mypage/></Suspense>
    }
])
export default root;