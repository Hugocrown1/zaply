"use client";

import React, { useState } from "react";
import UrlShortenerForm from "./UrlShortenerForm";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import ShortUrlItem from "./ShortUrlItem";
import { toast } from "sonner";

const UrlShortener = () => {
  const [shortUrlItem, setShortUrlItem] = useState<ShortUrlData>();

  const handleNewShortUrl = (urlData: ShortUrlData) => {
    setShortUrlItem(urlData);

    const shortUrlList = JSON.parse(
      localStorage.getItem("shortUrlList") || "[]"
    );
    const newShortUrlList = [urlData, ...shortUrlList];
    localStorage.setItem("shortUrlList", JSON.stringify(newShortUrlList));

    toast.success("URL shortened successfully!");
  };

  return (
    <div className="flex flex-col w-full max-w-[550px] mx-auto space-y-2">
      <UrlShortenerForm onNewShortUrl={handleNewShortUrl} />
      {shortUrlItem && <ShortUrlItem {...shortUrlItem} />}
    </div>
  );
};

export default UrlShortener;
