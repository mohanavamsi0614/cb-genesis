import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Registration from "../pages/Registration";
import Payment from "../pages/Payment";
import Admin from "../pages/admin";
import Teampanel from "../pages/Teampanel";


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
    },
    {path:'/teampanel',
        element:<Teampanel/>
    }
])

export default router;