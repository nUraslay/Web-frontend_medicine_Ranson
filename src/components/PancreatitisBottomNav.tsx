import { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../pancreatitisRoutes";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  enabled: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { path: ROUTES.FEED, label: ROUTE_LABELS.FEED, icon: "fa-solid fa-house", enabled: true },
  { path: ROUTES.ADD, label: ROUTE_LABELS.ADD, icon: "fa-regular fa-square-plus", enabled: false },
  { path: ROUTES.GRID, label: ROUTE_LABELS.GRID, icon: "fa-solid fa-border-all", enabled: true },
  { path: ROUTES.LOGIN, label: ROUTE_LABELS.LOGIN, icon: "fa-solid fa-right-to-bracket", enabled: false },
];

export const PancreatitisBottomNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar bsPrefix="bottom-nav" expand={false} variant="">
      {NAV_ITEMS.map((item) => (
        <Nav.Link
          key={item.path}
          as="button"
          type="button"
          bsPrefix="nav-item"
          active={location.pathname.startsWith(item.path)}
          disabled={!item.enabled}
          title={item.enabled ? item.label : "Будет доступно в следующих лабораторных"}
          onClick={() => item.enabled && navigate(item.path)}
        >
          <i className={item.icon} />
          <span>{item.label}</span>
        </Nav.Link>
      ))}
    </Navbar>
  );
};
