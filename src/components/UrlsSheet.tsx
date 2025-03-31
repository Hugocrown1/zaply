"use client";

import { ShortUrlData } from "@/interfaces/ShortUrlData";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import ShortUrlItem from "./ShortUrlItem";
import { useEffect, useState } from "react";

const UrlsSheet = () => {
  const [shortUrlList, setShortUrlList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedShortUrlList = localStorage.getItem("shortUrlList");
      if (storedShortUrlList) {
        setShortUrlList(JSON.parse(storedShortUrlList));
      }
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="saved links"
          className="w-11 h-8 border-[1px] border-[#5B5B5B] bg-background-900 rounded-sm cursor-pointer hover:bg-background-900/60 transition-colors "
        >
          📦
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your saved URLs</SheetTitle>
          <SheetDescription>
            Here are the URLs you have shortened.
          </SheetDescription>
        </SheetHeader>

        {shortUrlList.length === 0 ? (
          <p>You dont have saved URLs</p>
        ) : (
          <div className="flex flex-col w-full mt-2 max-h-[400px] overflow-y-auto px-2">
            <ul>
              {shortUrlList.map((urlData: ShortUrlData) => (
                <li key={urlData.short_code}>
                  <ShortUrlItem {...urlData} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UrlsSheet;
