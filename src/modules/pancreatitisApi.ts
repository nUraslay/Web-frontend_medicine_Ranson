import { PANCREATITIS_SIGNS_MOCK } from "./pancreatitisMock";

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
}

export interface SignsFilter {
  maxValue?: number;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

const API_PREFIX = "/api/pancreatitis-signs";

const mockDelay = <T,>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 300));

export const filterSignsMock = (filter: SignsFilter = {}): PancreatitisSign[] =>
  PANCREATITIS_SIGNS_MOCK.filter(
    (sign) => filter.maxValue === undefined || sign.threshold_value <= filter.maxValue
  );

export const getSigns = async (
  filter: SignsFilter = {}
): Promise<PancreatitisSign[]> => {
  if (USE_MOCK) {
    return mockDelay(filterSignsMock(filter));
  }

  const params = new URLSearchParams();
  if (filter.maxValue !== undefined) params.set("max_value", String(filter.maxValue));

  try {
    const response = await fetch(`${API_PREFIX}?${params.toString()}`);
    const json: ApiResponse<PancreatitisSign[]> = await response.json();
    return json.data;
  } catch {
    return filterSignsMock(filter);
  }
};

export const getSignById = async (
  id: number
): Promise<PancreatitisSign | undefined> => {
  const fromMock = () => PANCREATITIS_SIGNS_MOCK.find((sign) => sign.id === id);

  if (USE_MOCK) {
    return mockDelay(fromMock());
  }

  try {
    const response = await fetch(`${API_PREFIX}/feed/${id}`);
    const json: ApiResponse<PancreatitisSign> = await response.json();
    return json.data;
  } catch {
    return fromMock();
  }
};
