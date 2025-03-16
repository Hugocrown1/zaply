"use client";

import React, { useState } from "react";
import UrlShortenerForm from "./UrlShortenerForm";
import { ShortUrlData } from "@/interfaces/ShortUrlData";
import ShortUrlItem from "./ShortUrlItem";

const UrlShortener = () => {
  const [shortUrlItem, setShortUrlItem] = useState<ShortUrlData>();
  return (
    <section className="flex flex-col w-[400px]">
      <UrlShortenerForm onNewShortUrl={setShortUrlItem} />
      {shortUrlItem && <ShortUrlItem {...shortUrlItem} />}
    </section>
  );
};

export default UrlShortener;
