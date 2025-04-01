import useForm from "@/hooks/useForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { validateUrl } from "@/utils/validateUrl";
import { createShortUrl } from "@/server/actions/createShortUrl";

import { ShortUrlData } from "@/interfaces/ShortUrlData";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.error("Please enter a valid URL.");
      return;
    }

    try {
      setIsLoading(true);
      const urlData = await createShortUrl(longUrl);

      onNewShortUrl(urlData);

      setIsLoading(false);
      onResetForm();
    } catch (error) {
      setIsLoading(false);
      throw new Error(`Failed to shorten URL: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-2 max-w-[900px] mx-auto">
        <Input
          placeholder="https://"
          type="text"
          name="longUrl"
          value={longUrl}
          onChange={onInputChange}
        />
        <Button
          className="w-full sm:w-fit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Short URL
        </Button>
      </div>
    </form>
  );
};

export default UrlShortenerForm;
