// app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { getUser } from '@/utils/auth';

export async function GET() {
  try {
    console.log("getting getUser reqests------")
    const user = await getUser();

    console.log("the user is this: ", user)
    
    if (!user) {
      return new NextResponse(null, { status: 401 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
}