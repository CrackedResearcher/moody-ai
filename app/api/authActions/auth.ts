

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
      
      if (response.status === 201){
          // Manually set cookies
          document.cookie = `accessTokenMoodyAI=${data.accessToken}; path=/; HttpOnly; SameSite=Strict`;
          document.cookie = `refreshTokenMoodyAI=${data.refreshToken}; path=/; HttpOnly; SameSite=Strict`;
          
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

    // Manually set cookies
    document.cookie = `accessTokenMoodyAI=${data.accessToken}; path=/; HttpOnly; SameSite=Strict`;
    document.cookie = `refreshTokenMoodyAI=${data.refreshToken}; path=/; HttpOnly; SameSite=Strict`;

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