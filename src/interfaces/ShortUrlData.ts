export interface ShortUrlData {
    id?: number
    click_count: number | null
    creation_date: string | null
    expiration_date: string | null
    is_active: boolean | null
    long_url: string
    short_url?: string
    short_code: string
    user_id: number | null
    last_click: string | null
}