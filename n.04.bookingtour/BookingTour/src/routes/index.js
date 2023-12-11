import React from "react"

const Home = React.lazy(() => import("../pages/home"))
// other page components...
const About = React.lazy(() => import("../pages/about"))
const Login = React.lazy(() => import("../pages/auth/login"))
const Register = React.lazy(() => import("../pages/auth/register"))
const ForgotPassword = React.lazy(() => import("../pages/auth/forgot-password"))
const Payment = React.lazy(() => import("../pages/payment"))
const TourDetail = React.lazy(() => import("../pages/tour/detail"))
const TourList = React.lazy(() => import("../pages/tour/list"))
const Contact = React.lazy(() => import("../pages/contact"))
const Profile = React.lazy(() => import("../pages/user/profile"))
const Unauthorized = React.lazy(() => import("../pages/403"))
const routes = [
    { path: "/", element: <Home /> },
    // other mappings ...
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/payment/:tourId", element: <Payment /> },
    { path: "/tour-detail/:tourId", element: <TourDetail /> },
    { path: "/tour", element: <TourList /> },
    { path: "/booking", element: <TourDetail /> },
    { path: "/contact", element: <Contact /> },
    { path: "/profile", element: <Profile /> },
    { path: "/unauthorized", element: <Unauthorized /> }
]

export default routes