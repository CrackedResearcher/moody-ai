//basic utility function to get retrieve the cookies from browser
"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 

export async function getCookies() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessTokenMoodyAI")?.value;
    const refreshToken = cookieStore.get("refreshTokenMoodyAI")?.value; 

    if (!accessToken) {
        if (refreshToken) {
            cookieStore.delete("refreshToken"); 
        }

        redirect("/login"); 
    }

    return {
        accessToken
    };
}