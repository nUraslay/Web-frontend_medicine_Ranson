import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PancreatitisAppLayout } from "./PancreatitisAppLayout";
import { ROUTES } from "./pancreatitisRoutes";
import PancreatitisFeedPage from "./pages/PancreatitisFeedPage";
import PancreatitisGridPage from "./pages/PancreatitisGridPage";

const PancreatitisApp: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PancreatitisAppLayout />}>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FEED} replace />} />
          <Route path={ROUTES.FEED} element={<PancreatitisFeedPage />} />
          <Route path={`${ROUTES.FEED}/:id`} element={<PancreatitisFeedPage />} />
          <Route path={ROUTES.GRID} element={<PancreatitisGridPage />} />
          <Route path="*" element={<Navigate to={ROUTES.FEED} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PancreatitisApp;
