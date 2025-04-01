"use client";

import React, { useState } from "react";
import UrlShortenerForm from "./UrlShortenerForm";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import ShortUrlItem from "./ShortUrlItem";
import { toast } from "sonner";
import { useRecentUrlsStore } from "@/stores/useRecentUrlsStore";

const UrlShortener = () => {
  const [shortUrlItem, setShortUrlItem] = useState<ShortUrlData>();
  const { addUrl } = useRecentUrlsStore();

  const handleNewShortUrl = (urlData: ShortUrlData) => {
    setShortUrlItem(urlData);
    addUrl(urlData);

    toast.success("URL shortened successfully!");
  };

  return (
    <div className="flex flex-col w-full px-2 max-w-[550px] mx-auto space-y-2">
      <UrlShortenerForm onNewShortUrl={handleNewShortUrl} />
      {shortUrlItem && <ShortUrlItem {...shortUrlItem} />}
    </div>
  );
};

export default UrlShortener;
