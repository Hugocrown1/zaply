'use server';

import { APP_URL } from "@/constants/env";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import supabase from "@/lib/supabase";
import { codeGenerator } from "@/utils/codeGenerator";
import { validateUrl } from "@/utils/validateUrl";

export const createShortUrl = async (url: string): Promise<ShortUrlData> => {

    
    if(!url){
        throw new Error('Url is required');
    }

    const isValidUrl = validateUrl(url);
    
    if(!isValidUrl){
        throw new Error("Invalid url"); 
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
        throw new Error(`An error occurred creating the short url ${error?.message}`);
    }
    
    return {
        ...data,
        short_url: APP_URL + data.short_code,
    }
    
}