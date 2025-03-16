import { ShortUrlData } from "@/interfaces/ShortUrlData";

const ShortUrlItem = ({ short_url, long_url }: ShortUrlData) => {
  return (
    <article className="w-full p-4 border-2 border-gray-200 rounded-md mt-2">
      <h2 className="text-lg font-semibold">{short_url}</h2>
      <p className="text-sm text-gray-500">{long_url}</p>
    </article>
  );
};

export default ShortUrlItem;
