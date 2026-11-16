import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PancreatitisSignCard } from "../components/PancreatitisSignCard";
import { PancreatitisSignsFilter } from "../components/PancreatitisSignsFilter";
import { MAX_THRESHOLD_MOCK } from "../modules/pancreatitisMock";
import { ROUTES } from "../pancreatitisRoutes";
import {
  deletePancreatitisSign,
  getPancreatitisSignsList,
  setPancreatitisMaxValue,
} from "../slices/pancreatitisSignsSlice";
import { useAppDispatch, useAppSelector } from "../store";

const PancreatitisGridPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { signs, maxValue, loading, error } = useAppSelector((state) => state.pancreatitisSigns);
  const isAuthenticated = useAppSelector((state) => state.pancreatitisUser.isAuthenticated);

  useEffect(() => {
    dispatch(getPancreatitisSignsList());
  }, [dispatch, isAuthenticated]);

  const handleSubmit = () => {
    dispatch(getPancreatitisSignsList());
  };

  const handleDelete = (id: number) => {
    dispatch(deletePancreatitisSign(id));
  };

  return (
    <div id="grid-page" className="page active">
      <div className="grid-header">
        <h2 className="page-title">Все карточки</h2>
      </div>

      <PancreatitisSignsFilter
        maxValue={maxValue}
        setMaxValue={(value) => dispatch(setPancreatitisMaxValue(value))}
        sliderMax={MAX_THRESHOLD_MOCK}
        loading={loading}
        onSubmit={handleSubmit}
      />

      {error && <div className="form-error">{error}</div>}

      <div className="grid-container">
        {signs.length ? (
          signs.map((sign) => (
            <PancreatitisSignCard
              key={sign.id}
              title={sign.title}
              stage={sign.stage}
              image_url={sign.image_url}
              likes_count={sign.likes_count}
              onClick={() => navigate(`${ROUTES.FEED}/${sign.id}`)}
              onDelete={isAuthenticated && sign.is_mine ? () => handleDelete(sign.id) : undefined}
            />
          ))
        ) : (
          !loading && <p className="grid-empty">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default PancreatitisGridPage;
