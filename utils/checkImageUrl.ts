export const checkImageUrl = async (url: string) => {
  // check if url is valid, with cors disabled
  const response = await fetch(url, { mode: 'no-cors' });
  return response.ok;
};
