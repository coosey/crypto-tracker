export function parseDomain(url: string) {
  // Create a new URL object
  const parsedUrl = new URL(url);
  // Extract the hostname
  const hostname = parsedUrl?.hostname;
  // if hostname contains www, parse string further
  const parsedHostname = hostname?.split?.('www.').join('');
  return parsedHostname;
};