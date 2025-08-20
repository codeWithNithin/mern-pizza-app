import { createBrowserRouter } from "react-router-dom"
import NonAuth from "./components/NonAuth"
import Login from "./pages/Login"
import Root from "./components/Root"
import Dashboard from "./components/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Dashboard />,
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