import { FC } from "react";
import { Spinner } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { PancreatitisBottomNav } from "./components/PancreatitisBottomNav";
import { useAppSelector } from "./store";

export const PancreatitisAppLayout: FC = () => {
  const loading = useAppSelector((state) => state.pancreatitisSigns.loading);

  return (
    <div className="mobile-container">
      <Outlet />
      <PancreatitisBottomNav />
      {loading && (
        <div className="pancreatitis-loading-overlay">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};
