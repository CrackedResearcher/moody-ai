// utils/auth.ts
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  user_id: string
  // Add other token payload fields as needed
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    console.log("called the refresh api call logic-----")
    console.log("callin this refresh endpoint: ", `${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    )

    // if (!response.ok) {
    //   throw new Error('Failed to refresh token')
    // }

    const data = await response.json()

    console.log("got teh call from teh refresh api endpoint: ", data)
    return data.accessToken
  } catch (error) {
    throw error
  }
}

export async function validateToken(token: string) {
  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp < currentTime) {
        console.log("----token has been expired contnu??????-------")
      // Token has expired
      return false
    }
    console.log("----toek  has not been expired----")
    return true
  } catch {
    return false
  }
}

export async function getUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessTokenMoodyAI')
  const refreshToken = cookieStore.get('refreshTokenMoodyAI')

  if (!accessToken) {
    return null
  }

  try {
    // Check if access token is valid
    const isValid = await validateToken(accessToken.value)

    console.log("the is Valid fucntion resutls in thsi : ", isValid)

    if (!isValid && refreshToken) {

        console.log("refreshing the token as the old one was invalid......, ", refreshToken.value)
      // Try to refresh the token
      const newAccessToken = await refreshAccessToken(refreshToken.value)

      console.log("received the access toej new one here is it; ", newAccessToken)
      
      // Update the cookie with new access token
      cookieStore.set('accessTokenMoodyAI', newAccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      return newAccessToken
    }

    console.log("the access token is already valid so returning the value as it: ", accessToken.value);

    return accessToken.value
  } catch {
    return null
  }
}