"use server"
import { cookies } from "next/headers";

type FormData = {
    email: string;
    password: string;
    name: string;
  };

type loginData = {
    email: string;
    password: string;
}

type authResponse = {
    success: boolean;
    message: string;
}

export async function registerUser({email, password, name}: FormData){
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register/`,{
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({email, password, name}),
      });
      
      const data = await response.json();
      const { messsage, accessToken, refreshToken } = data;
      const cookieStore = await cookies();
      
      if (response.status === 201){
        cookieStore.set('accessTokenMoodyAI', accessToken, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
    
        // Set refresh token cookie
        cookieStore.set('refreshTokenMoodyAI', refreshToken, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

          
          return {
              success: true,
              message: "You have been successfully registered!"
          }
      } 
      else if (response.status === 400){
          return {
              success: false,
              message: "You already have an account linked to the email you entered. Please login instead.."
          }
      }
  } catch (error) {
      console.error("An error occurred on server side: ", error)
  }
}

export async function loginUser({ email, password }: loginData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Your login attempt failed. Please retry.",
      };
    }

    const cookieStore = await cookies();
    const { message, accessToken, refreshToken } = data;

    cookieStore.set('accessTokenMoodyAI', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Set refresh token cookie
    cookieStore.set('refreshTokenMoodyAI', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("An error occurred during logging in the user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function logoutUser(){
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshTokenMoodyAI")?.value;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Your logout attempt failed. Please retry.",
      };
      }
      
      cookieStore.delete("accessTokenMoodyAI");
      cookieStore.delete("refreshTokenMoodyAI");

      return {
        success: true,
        message: "You have been successfully logged out!",
      };

  } catch (error) {
    console.error("An error occurred during logging out the user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}