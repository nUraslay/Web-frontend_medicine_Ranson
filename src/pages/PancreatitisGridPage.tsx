import { FC, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { PancreatitisOutletContext } from "../PancreatitisAppLayout";
import { PancreatitisSignCard } from "../components/PancreatitisSignCard";
import { PancreatitisSignsFilter } from "../components/PancreatitisSignsFilter";
import { MAX_THRESHOLD_MOCK } from "../modules/pancreatitisMock";
import { PancreatitisSign, getSigns } from "../modules/pancreatitisApi";
import { ROUTES } from "../pancreatitisRoutes";

const PancreatitisGridPage: FC = () => {
  const navigate = useNavigate();
  const { setSigns } = useOutletContext<PancreatitisOutletContext>();

  const [searchParams, setSearchParams] = useSearchParams();
  const appliedMaxRaw = searchParams.get("max_value");
  const appliedMax = appliedMaxRaw !== null ? Number(appliedMaxRaw) : MAX_THRESHOLD_MOCK;

  const [maxValue, setMaxValue] = useState(appliedMax);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<PancreatitisSign[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getSigns({ maxValue: appliedMax }).then((result) => {
      if (cancelled) return;
      setCards(result);
      setSigns(result);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [appliedMax, setSigns]);

  const handleSubmit = () => {
    setSearchParams({ max_value: String(maxValue) });
  };

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.FEED}/${id}`);
  };

  return (
    <div id="grid-page" className="page active">
      <div className="grid-header">
        <h2 className="page-title">Все карточки</h2>
      </div>

      <PancreatitisSignsFilter
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        sliderMax={MAX_THRESHOLD_MOCK}
        loading={loading}
        onSubmit={handleSubmit}
      />

      {loading ? (
        <div className="page-spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="grid-container">
          {cards.length ? (
            cards.map((sign) => (
              <PancreatitisSignCard
                key={sign.id}
                title={sign.title}
                stage={sign.stage}
                image_url={sign.image_url}
                likes_count={sign.likes_count}
                onClick={() => handleCardClick(sign.id)}
              />
            ))
          ) : (
            <p className="grid-empty">Ничего не найдено</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PancreatitisGridPage;
