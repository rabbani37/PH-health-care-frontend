import { boolean, number } from "zod"
import { IDoctor } from "./doctor.type";

export interface APIResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T
    meta?: IQuery
}



export interface IQuery {
    searchTerm?: string
    page?: string
    limit?: string
    sortOrder?: string
    sortBy?: string
    [key: string]: any
}