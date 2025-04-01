import { ShortUrlData } from '@/interfaces/ShortUrlData'
import { create } from 'zustand'

export const useRecentUrlsStore = create<{
    urls: ShortUrlData[];
    addUrl: (urlData: ShortUrlData) => void;
    loadUrls: () => void;
    removeUrl: (shortCode: string) => void;
}>((set) => ({
  urls: [],

    addUrl: (urlData: ShortUrlData) => {
        set((state) => {
            const updatedUrls = [urlData, ...state.urls];
            localStorage.setItem('shortUrlList', JSON.stringify(updatedUrls));
            return { urls: updatedUrls };
        })
    },
    loadUrls: () =>
        set(() => {
          const storedUrls = JSON.parse(localStorage.getItem("shortUrlList") || "[]") as ShortUrlData[];
          return { urls: storedUrls };
        }),
    removeUrl: (shortCode: string) =>
        set((state) => {
            const updatedUrls = state.urls.filter((url) => url.short_code !== shortCode);
            localStorage.setItem('shortUrlList', JSON.stringify(updatedUrls));
            return { urls: updatedUrls };
        }
    ),


}))
