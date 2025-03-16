import useForm from "@/hooks/useForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { validateUrl } from "@/utils/validateUrl";
import { createShortUrl } from "@/server/actions/createShortUrl";

import { useFormStatus } from "react-dom";
import { ShortUrlData } from "@/interfaces/ShortUrlData";

interface UrlShortenerFormProps {
  onNewShortUrl: (urlData: ShortUrlData) => void;
}

const SubmitForm = () => {
  const status = useFormStatus();

  return (
    <Button
      isLoading={status.pending}
      disabled={status.pending}
      className="mt-2"
    >
      Submit
    </Button>
  );
};

const UrlShortenerForm = ({ onNewShortUrl }: UrlShortenerFormProps) => {
  const { formState, onInputChange, onResetForm } = useForm({
    longUrl: "",
  });

  const { longUrl } = formState;

  const handleSubmit = async () => {
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
    <form action={handleSubmit}>
      <Input
        placeholder="https://"
        type="text"
        name="longUrl"
        value={longUrl}
        onChange={onInputChange}
      />
      <SubmitForm />
    </form>
  );
};

export default UrlShortenerForm;
