import { createBrowserRouter } from "react-router-dom"
import NonAuth from "./components/NonAuth"
import Login from "./pages/Login"
import Root from "./components/Root"
import Dashboard from "./components/Dashboard"
import Home from "./pages/Home"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Dashboard />,
                children: [
                    {
                        path: "",
                        element: <Home />,
                    },
                ]
            },
        ],
    },
    {
        path: "/auth",
        element: <NonAuth />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
])

export default router