import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLongUrl } from "./server/middleware/getLongUrl";



export async function middleware(req: NextRequest) {
  const shortCode = req.nextUrl.pathname.substring(1);
  
  if (!shortCode) return

  const { longUrl, error, message} = await getLongUrl(shortCode);

  if(error || !longUrl) {
    console.error(message)
    return NextResponse.redirect('/')
  }

  return NextResponse.redirect(new URL(longUrl), 308); 
}

export const config = {
  matcher: "/([a-zA-Z0-9]{7})", 
};
