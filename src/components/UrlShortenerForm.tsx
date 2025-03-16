import useForm from "@/hooks/useForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { validateUrl } from "@/utils/validateUrl";

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
      // Call the API to shorten the URL
      const { data } = await axios.post("/api/short-url", {
        url: longUrl.trim(),
      });

      onNewShortUrl(data);

      onResetForm();
    } catch (error) {
      throw new Error(`Failed to shorten URL: ${error}`);
    }

    // Reset the form
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
