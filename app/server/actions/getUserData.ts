"use server"
import { getCookies } from "@/utils/getCookies"

export type UserDetails = {
    username: string;
    email: string;
    [key: string]: any; 
}

type responseData = {
    success: boolean;
    userDetails: UserDetails | null;
    message: string;
}


export async function getBasicUserDetails(): Promise<responseData>{
    try {
        console.log("calling hte user detials endpoint")
        const token = (await getCookies()).accessToken;
        if (!token) {
            return {
                success: false,
                userDetails: null,
                message: "No token found. Please log in again.",
            };
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getUserDetails`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();

        console.log("the user data is this: ", data)

        if(!response.ok){
            return {
                success: false,
                userDetails: null,
                message: data.message || "Failed to fetch user details.",
            }
        }


        return {
            success: true,
            userDetails: data.userDetails,
            message: "successfully retrieved user detials."
        }

    } catch (error) {
        return {
            success: false,
            userDetails: null,
            message: "Error fetching user details.",
        };
    }
}