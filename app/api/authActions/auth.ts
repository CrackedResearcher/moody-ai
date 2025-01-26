

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
            credentials: "include",
        })
        if (response.status==201){
            return {
                success: true,
                message: "You have been successfully registered!"
            }
        } 
        else if (response.status==400){
            return {
                success: false,
                message: "You already have an account linked to the email you entered. Please login instead.."
            }
        }
    } catch (error) {
        console.error("An error occured on server side: ", error)
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
        credentials: "include",
      });
  
      const log = await response.json();
      console.log("The login response is this: ", log);
  
      if (!response.ok) {
        return {
          success: false,
          message: log.message || "Your login attempt failed. Please retry.",
        };
      }
  
      return {
        success: true,
        message: log.message,
      };
    } catch (error) {
      console.error("An error occurred during logging in the user:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  }