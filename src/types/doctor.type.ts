import { TUser, UserRole } from "./user.type";

export interface DoctorApplicationData {

    user: {
        name: string;
        email: string;
    },

    doctor: {
        address: string | undefined;
        specialization: string;
        licenseNumber: string;
        qualifications: string;
        experienceYears: number;
        bio: string | undefined;
        consultationFee: number;
        contactNumber: string | undefined;
    }

}

export interface DoctorApplicationPayload {
    resume: File,
    additionalFiles: File[],
    data: DoctorApplicationData
}


// ===========================


export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IDoctor {
    id: string
    name: string
    email: string
    address?: null | string
    specialization: string
    licenseNumber: string
    qualifications: string
    experienceYears: number
    bio?: null | string
    consultationFee?: null | string
    contactNumber?: null | string
    verificationStatus: DoctorVerificationStatus
    rejectionReason?: null | string
    reviewedBy?: null | string
    reviewedAt?: null | string
    resume?: null | string
    resumePublicId?: null | string
    additionalFiles?: IAdditionalFile[]| null
    isDeleted: boolean
    deletedAt?: null | string
    createdAt: string
    updatedAt: string
    userId: string
    user: TUser
}

export interface IAdditionalFile {
    url: string
    publicId: string
}


