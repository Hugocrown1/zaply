import supabase from "@/lib/supabase";

interface getLongUrlResponse {
    longUrl: string | null
    error: boolean
    message: string

}

export const getLongUrl = async (urlCode: string): Promise<getLongUrlResponse> => {
    const handleError = (message: string) => ({
      longUrl: null,
      error: true,
      message,
    });

    const { data, error } = await supabase.rpc("increment_click_count_and_get_long_url", { _url_code: urlCode }).single()
  
    if (error || !data) return handleError("Error fetching/updating the short URL");
  
    return { longUrl: data.long_url , error: false, message: "Long URL fetched successfully" };
  };