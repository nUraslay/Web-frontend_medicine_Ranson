export const DEFAULT_IMAGE = "/img/default_pancreatitis_sign.jpg";
export const DEFAULT_VIDEO = "/video/default_pancreatitis_sign.mp4";
export const imageOrDefault = (url?: string): string =>
  url && url.trim() ? url : DEFAULT_IMAGE;

export const videoOrDefault = (url?: string): string =>
  url && url.trim() ? url : DEFAULT_VIDEO;
