"use client";

import { useRef } from "react";

import { ShortUrlData } from "@/interfaces/ShortUrlData";
import { Copy, Link } from "lucide-react";
import { toast } from "sonner";

const ShortUrlItem = ({ short_url, long_url }: ShortUrlData) => {
  const linkRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerText);
    }
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="relative flex flex-col w-full p-4 border-[1px] bg-background-900/10 border-background-900/90 rounded-md mt-2">
      <button
        onClick={handleCopy}
        aria-label="copy url"
        className="flex flex-row space-x-2 cursor-pointer"
      >
        <p ref={linkRef} className=" font-semibold">
          {short_url}
        </p>{" "}
        <Copy size={16} />
      </button>

      <p className="text-xs text-gray-500 truncate text-nowrap">{long_url}</p>
    </div>
  );
};

export default ShortUrlItem;
