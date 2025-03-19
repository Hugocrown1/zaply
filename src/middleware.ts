import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_URL } from "@/constants/env";
import { getLongUrl } from "./server/middleware/getLongUrl";



export async function middleware(req: NextRequest) {
  const shortCode = req.nextUrl.pathname.substring(1);
  
  if (!shortCode) return NextResponse.redirect(APP_URL); 

  const { longUrl, error, message} = await getLongUrl(shortCode);

  if(error || !longUrl) {
    console.error(message)
    return NextResponse.redirect(APP_URL)
  }

  return NextResponse.redirect(longUrl, 308); 
}

export const config = {
  matcher: "/([a-zA-Z0-9]{7})", 
};
