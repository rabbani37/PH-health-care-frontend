import apiClient from "@/lib/apiClient";
import { APIResponse } from "@/types/api.type";
import { IRegisterPatientPayload } from "@/types/auth.type";
import { IDoctor } from "@/types/doctor.type";

export function userLogin(payload: { email: string, password: string }) {
    return apiClient("/auth/login", { method: "POST", body: payload })
}
export function getMe() {
    return apiClient("/auth/me")
}
export function userLogout() {
    return apiClient("/auth/logout", { method: "POST" })
}
export function googleOAuth(payload: { idToken: string }) {
    return apiClient("/auth/google", { method: "POST", body: payload })
}
export function registerPatient(payload: IRegisterPatientPayload) {
    return apiClient("/auth/register", { method: "POST", body: payload })
}
export function verifyAccount(payload: { email: string; otp: string }) {
    return apiClient("/auth/verify-email", { method: "POST", body: payload })
}
export function getAllDoctors() {
    return apiClient<APIResponse<IDoctor[]>>("/doctor/all-doctors")
}
