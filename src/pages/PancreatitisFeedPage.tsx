import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { PancreatitisOutletContext } from "../PancreatitisAppLayout";
import { DEFAULT_VIDEO, videoOrDefault } from "../modules/pancreatitisDefaults";
import { PancreatitisSign, getSignById, getSigns } from "../modules/pancreatitisApi";
import { ROUTES } from "../pancreatitisRoutes";

const handleVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
  const video = event.currentTarget;
  if (!video.src.endsWith(DEFAULT_VIDEO)) {
    video.src = DEFAULT_VIDEO;
  }
};

const PancreatitisFeedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signs } = useOutletContext<PancreatitisOutletContext>();
  const signId = id ? Number(id) : undefined;

  const fromList =
    signId === undefined ? signs[0] : signs.find((item) => item.id === signId);

  const [fetched, setFetched] = useState<PancreatitisSign | null | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (fromList) return;

    let cancelled = false;
    setFetched(undefined);
    const request =
      signId === undefined
        ? getSigns().then((list) => list[0])
        : getSignById(signId);
    request.then((result) => {
      if (!cancelled) setFetched(result ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [signId, fromList]);

  useEffect(() => {
    setExpanded(false);
  }, [signId]);

  const sign = fromList ?? fetched ?? undefined;
  const notFound = !fromList && fetched === null;

  const handleNext = () => {
    if (!sign || !signs.length) return;
    const index = signs.findIndex((item) => item.id === sign.id);
    const next = signs[(index + 1) % signs.length];
    navigate(`${ROUTES.FEED}/${next.id}`);
  };

  if (notFound) {
    return (
      <div id="feed-page" className="page active">
        <div className="feed-overlay">
          <div className="feed-info">
            <div className="feed-title">Признак не найден</div>
          </div>
        </div>
      </div>
    );
  }

  if (!sign) {
    return (
      <div id="feed-page" className="page active">
        <div className="page-spinner">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  const videoSrc = videoOrDefault(sign.video_url);

  return (
    <div id="feed-page" className="page active">

      <video
        key={`${sign.id}-${videoSrc}`}
        className="feed-video-bg"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onError={handleVideoError}
      />
      <div className="feed-overlay">
        <div className="feed-info">
          <div className="feed-title" id="feed-title-text">
            {sign.title}
          </div>
          <div className="feed-desc-container">
            <span className={`feed-desc-text ${expanded ? "expanded" : ""}`} id="feed-desc">
              {sign.description}
            </span>
            <button type="button" className="feed-more-btn" onClick={() => setExpanded(!expanded)}>
              {expanded ? "скрыть" : "еще"}
            </button>
          </div>
        </div>

        <div className="feed-right-actions">
          <div className="action-btn like-btn">
            <i className="fa-solid fa-heart" />
            <span id="feed-likes">{sign.likes_count}</span>
          </div>
          <button
            type="button"
            className="feed-next-btn"
            aria-label="Следующий признак"
            onClick={handleNext}
          >
            <i className="fa-solid fa-arrow-right" />
          </button>

          <div className="feed-params">
            <div className="feed-param feed-param-threshold">{sign.threshold_value}</div>
            {sign.stage && <div className="feed-param feed-param-stage">{sign.stage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PancreatitisFeedPage;
