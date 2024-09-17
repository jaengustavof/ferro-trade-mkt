import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import { Market } from "../pages/Market";
import { Error } from "../pages/Error";
import { Cart } from "../pages/Cart";
import { DashBoard } from "../pages/DashBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement : <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    },
    {
        path: "/market",
        element: <AppLayout />,
        errorElement : <Error />,
        children:[
            {
                index: true,
                element: <Market />,
            }
        ]

    },
    {
        path: "/cart",
        element: <AppLayout />,
        errorElement : <Error />,
        children:[
            {
                index: true,
                element: <Cart />,
            }
        ]

    },
    {
        path: "/dashboard",
        element: <AppLayout />,
        errorElement : <Error />,
        children:[
            {
                index: true,
                element: <DashBoard />,
            }
        ]

    },

]);