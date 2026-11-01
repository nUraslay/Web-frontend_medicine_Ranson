export const ROUTES = {
  HOME: "/",
  FEED: "/pancreatitis-signs/feed",
  ADD: "/pancreatitis-signs/add",
  GRID: "/pancreatitis-signs/grid",
  LOGIN: "/login",
} as const;

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  FEED: "Лента",
  ADD: "Добавить",
  GRID: "Плитка",
  LOGIN: "Вход",
};
