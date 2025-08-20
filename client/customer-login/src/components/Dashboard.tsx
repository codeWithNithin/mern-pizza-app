
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "./AppSideBar"


export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <Outlet />
            </main>
        </SidebarProvider>

    )
}