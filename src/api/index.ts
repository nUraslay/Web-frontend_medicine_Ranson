import { Api } from "./Api";

export const api = new Api({
  baseURL: "/api",
});

export const setPancreatitisApiToken = (token: string | null) => {
  if (token) {
    api.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.instance.defaults.headers.common.Authorization;
  }
};