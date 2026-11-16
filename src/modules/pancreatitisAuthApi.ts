import axios from "axios";

export const PANCREATITIS_TOKEN_KEY = "pancreatitis_token";

interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export const loginPancreatitisUser = async (login: string, password: string): Promise<string> => {
  const body = new URLSearchParams({ login, password });
  const { data } = await axios.post<LoginResponse>("/api/auth/login", body);
  return data.data.access_token;
};

export const registerPancreatitisUser = async (login: string, password: string): Promise<void> => {
  const body = new URLSearchParams({ login, password });
  await axios.post("/api/users", body);
};

export const logoutPancreatitisUser = async (token: string): Promise<void> => {
  await axios.post("/api/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const pancreatitisErrorText = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const description = (error.response?.data as { description?: string } | undefined)?.description;
    if (description) return description;
  }
  return fallback;
};
