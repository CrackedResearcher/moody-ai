// app/server/actions/authActions.ts
'use server';

import { cookies } from 'next/headers';


type loginData = {
    email: string;
    password: string;
}

export type authResponse = {
    message: string;
    success: boolean;
}


export async function registerUser(formData: { email: string; password: string; name: string }): Promise<authResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("the register endpoint gave thsi: ", data)
    const cookieStore = await cookies();
    const { success, message, accessToken, refreshToken } = data;

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
        success: success, message: message
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Failed to register user" };
  }
}

export async function loginUser({ email, password }: loginData): Promise<authResponse> {
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
    const { success, message, accessToken, refreshToken } = data;

    cookieStore.set('accessTokenMoodyAI', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 15, // 15 m
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
      success: success,
      message: message,
    };

  } catch (error) {
    console.error("An error occurred during logging in the user:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

//attcah the promise of auth reponse here below
export async function logoutUser(): Promise<authResponse> {
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