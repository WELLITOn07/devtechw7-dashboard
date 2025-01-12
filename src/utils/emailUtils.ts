export const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const parseEmailList = (inputText: string) => {
  if (!inputText || typeof inputText !== "string") return [];
  return inputText
    .split(/\s*[\n,;]\s*/)
    .filter((email) => validateEmail(email));
};
