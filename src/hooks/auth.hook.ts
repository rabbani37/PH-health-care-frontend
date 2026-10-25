import { getAllDoctors, getMe, googleOAuth, registerPatient, userLogin, userLogout, verifyAccount } from "@/API";
import { toast } from "@/components/ui/toast";
import { DoctorParams } from "@/types/doctor.type";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";


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
export function useGelAllDoctors(params:DoctorParams){
    return useQuery({
        queryKey:["doctors",params],
        queryFn:()=> getAllDoctors(params),
    })
}
export function useSuspenseGelAllDoctors(params:DoctorParams){
    return useSuspenseQuery({
        queryKey:["doctors",params],
        queryFn:()=> getAllDoctors(params),
    })
}