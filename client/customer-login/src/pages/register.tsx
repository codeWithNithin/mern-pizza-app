
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GalleryVerticalEnd, Loader2Icon } from "lucide-react"
import { register, self } from "@/http/api"
import { useAuthStore } from "@/store"
import type { RegisterCreds } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters',
    }),
    userName: z.string().min(3, {
        message: 'Username must be at least 3 characters',
    }),
})

const registerUser = async (credentials: RegisterCreds) => {
    const { data } = await register(credentials);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

const Register = () => {
    const { setUser } = useAuthStore();

    const navigate = useNavigate()

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false,
    });

    // const { mutate: logoutMutate } = useMutation({
    //   mutationKey: ['logout'],
    //   mutationFn: logout,
    //   onSuccess: async () => {
    //     logoutFromStore();
    //     return;
    //   },
    // });

    const { mutate, isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: registerUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            setUser(selfDataPromise.data);
        },
    });


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            userName: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutate(data);
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    SliceWala
                </a>

                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Register your account</CardTitle>
                        <CardDescription>
                            Enter your details below to register to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" onClick={() => { navigate("/auth/login") }}>Sign In</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="w-full">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your user name" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your password" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {
                                        isPending ? <Loader2Icon className="animate-spin" /> : 'Register'
                                    }
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </div>
        </div>


    )
}

export default Register