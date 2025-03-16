import { APP_URL } from "@/constants/env";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import supabase from "@/lib/supabase";
import { codeGenerator } from "@/utils/codeGenerator";
import { validateUrl } from "@/utils/validateUrl";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    const { url } = await req.json();

    if(!url){
        return NextResponse.json({message: 'Url is required'}, {status: 400});
    }

    const isValidUrl = validateUrl(url);
    
    if(!isValidUrl){
        return NextResponse.json({message: 'Invalid url'}, {status: 400});
    }

    const urlCode = codeGenerator()

    const shortUrlData: ShortUrlData = {
        long_url: url,
        short_code: urlCode,
        click_count: 0,
        creation_date: new Date().toISOString(),
        expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
        is_active: true,
        user_id: null
         
    }

    const { error, data } = await supabase.from('urls').insert(shortUrlData).select('*').single();

    if(error || !data){
        return NextResponse.json({message: 'An error occurred creating the short url'}, {status: 500});
    }
    
    return NextResponse.json({
        ...data,
        short_url: APP_URL + data.short_code,
    },
    {status: 200});


}