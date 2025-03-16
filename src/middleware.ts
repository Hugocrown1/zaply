import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "@/lib/supabase";
import { APP_URL } from "@/constants/env";



export async function middleware(req: NextRequest) {
  const shortCode = req.nextUrl.pathname.substring(1);

  console.log({shortCode});
  

  if (!shortCode) return NextResponse.redirect(APP_URL); 

  // Buscar la URL larga en Supabase
  const { data, error } = await supabase
    .from("urls")
    .select("long_url")
    .eq("short_code", shortCode)
    .single();

  if (error || !data) {
    return NextResponse.redirect(APP_URL); 
  }

  return NextResponse.redirect(data.long_url, 308); 
}

export const config = {
  matcher: "/([a-zA-Z0-9]{7})", // Coincide solo con rutas de 7 caracteres alfanuméricos
};
