export const DEFAULT_IMAGE = "/img/default_pancreatitis_sign.jpg";
export const DEFAULT_VIDEO = "/video/default_pancreatitis_sign.mp4";

const MINIO_ORIGIN = "http://localhost:9000";

export const pancreatitisMediaUrl = (url: string | undefined, fallback: string): string => {
  if (!url || !url.trim() || url.startsWith("/static/")) return fallback;
  if (url.startsWith(MINIO_ORIGIN)) return url.slice(MINIO_ORIGIN.length);
  return url;
};

export const imageOrDefault = (url?: string): string => pancreatitisMediaUrl(url, DEFAULT_IMAGE);

export const videoOrDefault = (url?: string): string => pancreatitisMediaUrl(url, DEFAULT_VIDEO);
