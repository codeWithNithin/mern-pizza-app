"use client"

import { useAuthStore } from "@/store";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/http/api";
import { Loader2Icon } from "lucide-react";


export default function Header() {
    //   const { toggleSidebar } = useSidebar()
    const { user, logout: logoutFromStore } = useAuthStore();
    const { mutate, isPending } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore()
        }
    });

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b justify-end">
            <div className="flex h-(--header-height) items-center gap-2 px-4">
                {
                    user?.role === 'admin' ? 'You are admin' : user?.userName
                }
            </div>
            <Button variant='link' className="flex h-(--header-height) items-center gap-2 px-4" disabled={isPending} onClick={() => mutate()}>
                {
                    isPending ? <Loader2Icon className="animate-spin" /> : 'Logout'
                }
            </Button>
        </header>
    )
}
