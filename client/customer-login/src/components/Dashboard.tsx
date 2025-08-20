
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router-dom"
import { AppSidebar } from "./AppSideBar"
import { useAuthStore } from "@/store";


export default function Dashboard() {
    const { user } = useAuthStore();

    if (user === null) {
       return <Navigate
            to={`/auth/login?returnTo=${location.pathname}`}
            replace={true}
        />
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <Outlet />
            </main>
        </SidebarProvider>

    )
}