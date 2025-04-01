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
import { useRecentUrlsStore } from "@/stores/useRecentUrlsStore";
import { TooltipWrap } from "./ui/TooltipWrap";

const UrlsSheet = () => {
  const { loadUrls, urls } = useRecentUrlsStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUrls();
    }
  }, []);

  return (
    <Sheet>
      <TooltipWrap tooltip="Recent URLs">
        <SheetTrigger asChild>
          <button
            aria-label="saved links"
            className="w-11 h-8 border-[1px] border-[#5B5B5B] bg-background-900 rounded-sm cursor-pointer hover:bg-background-900/60 transition-colors "
          >
            📦
          </button>
        </SheetTrigger>
      </TooltipWrap>

      <SheetContent className="w-full sm:max-w-[450px]">
        <SheetHeader>
          <SheetTitle>Your saved URLs</SheetTitle>
          <SheetDescription>
            Here are the URLs you have shortened.
          </SheetDescription>
        </SheetHeader>

        {urls.length === 0 ? (
          <p>You dont have saved URLs</p>
        ) : (
          <div className="flex flex-col w-full h-full mt-2 overflow-y-auto px-2">
            <ul className="h-full">
              {urls.map((urlData: ShortUrlData) => (
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
