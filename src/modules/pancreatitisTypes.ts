import type { HandlerSignSerializer } from "../api/Api";

export interface PancreatitisSign {
  id: number;
  title: string;
  description: string;
  status: string;
  stage: string;
  threshold_value: number;
  image_url: string;
  video_url: string;
  likes_count: number;
  is_liked?: number;
  is_mine?: number;
}

export const toPancreatitisSign = (sign: HandlerSignSerializer): PancreatitisSign => ({
  id: sign.id ?? 0,
  title: sign.title ?? "",
  description: sign.description ?? "",
  status: sign.status ?? "",
  stage: sign.stage ?? "",
  threshold_value: sign.threshold_value ?? 0,
  image_url: sign.image_url ?? "",
  video_url: sign.video_url ?? "",
  likes_count: sign.likes_count ?? 0,
  is_liked: sign.is_liked ?? 0,
  is_mine: sign.is_mine ?? 0,
});
