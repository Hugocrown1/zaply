"use client";

import { useRef } from "react";

import { ShortUrlData } from "@/interfaces/ShortUrlData";
import { Copy, Link, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRecentUrlsStore } from "@/stores/useRecentUrlsStore";

const ShortUrlItem = ({ short_url, long_url, short_code }: ShortUrlData) => {
  const { removeUrl } = useRecentUrlsStore();

  const linkRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerText);
    }
    toast.success("URL copied to clipboard!");
  };

  // const handleDelete = () => {
  //   removeUrl(short_code);
  //   toast.success("URL deleted successfully!");
  // };

  return (
    <div className="relative flex flex-col w-full p-4 border-[1px] bg-background-900/10 border-background-900/90 rounded-md mt-2 ">
      {/* <button
        onClick={handleDelete}
        className="absolute right-2 top-1.5 cursor-pointer"
        aria-label="delete url"
      >
        <Trash2 color="#8B0000" size={16} />
      </button> */}
      <button
        onClick={handleCopy}
        aria-label="copy url"
        className="flex flex-row space-x-2 cursor-pointer"
      >
        <p ref={linkRef} className=" font-semibold truncate text-nowrap">
          {short_url}
        </p>{" "}
        <Copy size={16} />
      </button>

      <p className="text-xs text-gray-500 truncate text-nowrap">{long_url}</p>
    </div>
  );
};

export default ShortUrlItem;
