

export const validateUrl = (url: string) => {
  const trimedUrl = url.trim();

  return URL.canParse(trimedUrl);
}