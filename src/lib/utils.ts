import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensures image URLs are served over HTTPS.
 * If the URL is HTTP, it proxies it via wsrv.nl to avoid Mixed Content errors.
 */
export function getSecureImageUrl(url: string | undefined): string {
  if (!url) return '';
  
  if (url.startsWith('https://')) {
    return url;
  }
  
  // Use wsrv.nl to proxy HTTP images to HTTPS
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}`;
}
