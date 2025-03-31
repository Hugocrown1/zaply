import useForm from "@/hooks/useForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { validateUrl } from "@/utils/validateUrl";
import { createShortUrl } from "@/server/actions/createShortUrl";

import { ShortUrlData } from "@/interfaces/ShortUrlData";
import { useState } from "react";

interface UrlShortenerFormProps {
  onNewShortUrl: (urlData: ShortUrlData) => void;
}

const UrlShortenerForm = ({ onNewShortUrl }: UrlShortenerFormProps) => {
  const { formState, onInputChange, onResetForm } = useForm({
    longUrl: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { longUrl } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (longUrl.length <= 2) return;

    const isValid = validateUrl(longUrl);

    if (!isValid) {
      alert("Invalid URL");
      return;
    }

    try {
      setIsLoading(true);
      const urlData = await createShortUrl(longUrl);

      onNewShortUrl(urlData);

      setIsLoading(false);
      onResetForm();
    } catch (error) {
      throw new Error(`Failed to shorten URL: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row w-full items-center justify-center space-x-2 max-w-[900px] mx-auto">
        <Input
          placeholder="https://"
          type="text"
          name="longUrl"
          value={longUrl}
          onChange={onInputChange}
        />
        <Button isLoading={isLoading} disabled={isLoading}>
          Short URL
        </Button>
      </div>
    </form>
  );
};

export default UrlShortenerForm;
