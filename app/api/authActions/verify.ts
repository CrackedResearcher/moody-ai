import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next/types";
import { cookies } from "next/headers";

export async function verifyServerToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenMoodyAI")?.value;

  console.log("verifyServerToken gives this token: ", token)

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return { isAuthenticated: true };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

// Keep the existing handler for API route compatibility
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({
      message: "Authenticated", 
      success: true
    });
  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid",
      success: false
    });
  }
}