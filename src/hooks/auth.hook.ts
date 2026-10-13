import { userLogin } from "@/API";
import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useLogin() {


    const router = useRouter()
    return useMutation({
        mutationFn: userLogin,
        onSuccess: ({ res }) => {
            toast.add({
                type: "success",
                title: "Welcome back!",
                description: "You have logged in successfully.",
            })


            router.push("/")

        },
        onError: (err) => {
            toast.add({
                type: "error",
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",

            })

        }
    })
}