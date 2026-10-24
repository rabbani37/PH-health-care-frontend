import { getAllDoctors, getMe, googleOAuth, registerPatient, userLogin, userLogout, verifyAccount } from "@/API";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useLogin() {

   
    return useMutation({
        mutationFn: userLogin,
    })
}


export function useLogout() {
    return useMutation({
        mutationFn:userLogout
    })
}

export function useGetMe(){
    return useQuery({
        queryKey:["user"],
        queryFn:getMe,
        retry:false,
        staleTime: 1000 * 60 * 5,
    })
}
export function useGoogleOAuth(){
    return useMutation({
        mutationFn:googleOAuth,
    })
}
export function useRegisterPatient(){
    return useMutation({
        mutationFn:registerPatient,
    })
}
export function useVerifyAccount(){
    return useMutation({
        mutationFn:verifyAccount,
    })
}
export function useGelAllDoctors(){
    return useQuery({
        queryKey:["doctors"],
        queryFn:getAllDoctors,
    })
}