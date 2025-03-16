const URL_REGEX =
  /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const validateUrl = (url: string) => {
  const trimedUrl = url.trim();

  return !!trimedUrl.match(URL_REGEX);
}