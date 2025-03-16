"use server";

import { APP_URL } from "@/constants/env";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import supabase from "@/lib/supabase";
import { codeGenerator } from "@/utils/codeGenerator";
import { validateUrl } from "@/utils/validateUrl";

export const createShortUrl = async (url: string): Promise<ShortUrlData & { short_url: string }> => {
    if (!url) {
        throw new Error("URL is required.");
    }

    if (!validateUrl(url)) {
        throw new Error("Invalid URL.");
    }


    let urlCode: string;
    let insertedData = null;

    // Intenta generar una URL corta sin colisión en Supabase
    for (let i = 0; i < 3; i++) {
        urlCode = codeGenerator();
        const { data, error } = await supabase.from("urls").insert({
            long_url: url,
            short_code: urlCode,
            click_count: 0,
            creation_date: new Date().toISOString(),
            expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
            is_active: true,
            user_id: null
        }).select("*").single();

        if (!error) {
            insertedData = data;
            break;
        }
    }

    if (!insertedData) {
        throw new Error("Failed to generate a unique short URL after multiple attempts.");
    }

    return {
        ...insertedData,
        short_url: APP_URL + insertedData.short_code,
    };
};
