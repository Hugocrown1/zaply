import useForm from "@/hooks/useForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { validateUrl } from "@/utils/validateUrl";
import { createShortUrl } from "@/server/url/createShortUrl";

interface UrlShortenerFormProps {
  onNewShortUrl: (shortUrl: any) => void;
}

const UrlShortenerForm = ({ onNewShortUrl }: UrlShortenerFormProps) => {
  const { formState, onInputChange, onResetForm } = useForm({ longUrl: "" });
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
      const urlData = await createShortUrl(longUrl);

      onNewShortUrl(urlData);

      onResetForm();
    } catch (error) {
      throw new Error(`Failed to shorten URL: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="longUrl"
        value={longUrl}
        onChange={onInputChange}
      />
      <Button className="mt-2">Submit</Button>
    </form>
  );
};

export default UrlShortenerForm;
