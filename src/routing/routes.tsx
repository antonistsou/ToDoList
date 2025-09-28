import App from "@/App";
import Login from "@/Login";
import SignUp from "@/SignUp";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    }
]);


export default router;