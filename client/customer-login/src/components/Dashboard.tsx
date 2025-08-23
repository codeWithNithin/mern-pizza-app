
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router-dom"
import { AppSidebar } from "./AppSideBar"
import { useAuthStore } from "@/store";
import Header from "./Header";


export default function Dashboard() {
    const { user } = useAuthStore();

    if (user === null) {
        return <Navigate
            to={`/auth/login?returnTo=${location.pathname}`}
            replace={true}
        />
    }

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <Header />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <Outlet />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>

    )
}