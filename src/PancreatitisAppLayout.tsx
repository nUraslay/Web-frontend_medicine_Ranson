import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { PancreatitisBottomNav } from "./components/PancreatitisBottomNav";
import { PancreatitisSign, getSigns } from "./modules/pancreatitisApi";

export interface PancreatitisOutletContext {
  signs: PancreatitisSign[];
  setSigns: Dispatch<SetStateAction<PancreatitisSign[]>>;
}

export const PancreatitisAppLayout: FC = () => {

  const [signs, setSigns] = useState<PancreatitisSign[]>([]);

  useEffect(() => {
    getSigns().then((all) => setSigns((current) => (current.length ? current : all)));
  }, []);

  return (
    <div className="mobile-container">
      <Outlet context={{ signs, setSigns } satisfies PancreatitisOutletContext} />
      <PancreatitisBottomNav />
    </div>
  );
};
