import { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { setPancreatitisApiToken } from "../api";
import { PANCREATITIS_TOKEN_KEY, logoutPancreatitisUser } from "../modules/pancreatitisAuthApi";
import { LOGOUT_LABEL, ROUTES, ROUTE_LABELS } from "../pancreatitisRoutes";
import { resetPancreatitisUser } from "../slices/pancreatitisUserSlice";
import { useAppDispatch, useAppSelector } from "../store";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  enabled: boolean;
}

export const PancreatitisBottomNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.pancreatitisUser);

  const navItems: NavItem[] = [
    { path: ROUTES.FEED, label: ROUTE_LABELS.FEED, icon: "fa-solid fa-house", enabled: true },
    { path: ROUTES.ADD, label: ROUTE_LABELS.ADD, icon: "fa-regular fa-square-plus", enabled: isAuthenticated },
    { path: ROUTES.GRID, label: ROUTE_LABELS.GRID, icon: "fa-solid fa-border-all", enabled: true },
  ];

  const handleLogout = async () => {
    await logoutPancreatitisUser(token).catch(() => undefined);
    localStorage.removeItem(PANCREATITIS_TOKEN_KEY);
    setPancreatitisApiToken(null);
    dispatch(resetPancreatitisUser());
    navigate(ROUTES.FEED);
  };

  return (
    <Navbar bsPrefix="bottom-nav" expand={false} variant="">
      {navItems.map((item) => (
        <Nav.Link
          key={item.path}
          as="button"
          type="button"
          bsPrefix="nav-item"
          active={location.pathname.startsWith(item.path)}
          disabled={!item.enabled}
          title={item.enabled ? item.label : "Доступно после входа"}
          onClick={() => item.enabled && navigate(item.path)}
        >
          <i className={item.icon} />
          <span>{item.label}</span>
        </Nav.Link>
      ))}
      {isAuthenticated ? (
        <Nav.Link as="button" type="button" bsPrefix="nav-item" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket" />
          <span>{LOGOUT_LABEL}</span>
        </Nav.Link>
      ) : (
        <Nav.Link
          as="button"
          type="button"
          bsPrefix="nav-item"
          active={location.pathname.startsWith(ROUTES.LOGIN)}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          <i className="fa-solid fa-right-to-bracket" />
          <span>{ROUTE_LABELS.LOGIN}</span>
        </Nav.Link>
      )}
    </Navbar>
  );
};
