import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Registration from "../pages/Registration";
import Payment from "../pages/Payment";
import Admin from "../pages/admin";


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
    },
    {path:'/admin',
        element:<Admin/>
    }
])

export default router;