import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import { Create } from "../pages/Create";
import { Market } from "../pages/Market";
import { Error } from "../pages/Error";
import { Cart } from "../pages/Cart";



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
        path: "/create",
        element: <AppLayout />,
        errorElement : <Error />,
        children: [
            {
                index: true,
                element: <Create />,
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

]);