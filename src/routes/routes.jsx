import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Registration from "../pages/Registration";
import Payment from "../pages/Payment";


const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
    },
    {
        path:'/register',
        element:<Registration/>,
    },
    {
        path:'/payment',
        element:<Payment/>,
    }
])

export default router;