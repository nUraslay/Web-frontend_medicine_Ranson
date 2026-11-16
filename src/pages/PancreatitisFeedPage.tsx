import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DEFAULT_VIDEO, videoOrDefault } from "../modules/pancreatitisDefaults";
import { ROUTES } from "../pancreatitisRoutes";
import { getPancreatitisSignFeed, likePancreatitisSign } from "../slices/pancreatitisSignsSlice";
import { useAppDispatch, useAppSelector } from "../store";

const handleVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
  const video = event.currentTarget;
  if (!video.src.endsWith(DEFAULT_VIDEO)) {
    video.src = DEFAULT_VIDEO;
  }
};

const PancreatitisFeedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { feedSign: sign, loading } = useAppSelector((state) => state.pancreatitisSigns);
  const isAuthenticated = useAppSelector((state) => state.pancreatitisUser.isAuthenticated);
  const signId = id ? Number(id) : undefined;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getPancreatitisSignFeed({ id: signId }));
    setExpanded(false);
  }, [dispatch, signId, isAuthenticated]);

  const handleNext = async () => {
    if (!sign) return;
    const result = await dispatch(getPancreatitisSignFeed({ id: sign.id, next: true }));
    if (getPancreatitisSignFeed.fulfilled.match(result) && result.payload.sign) {
      navigate(`${ROUTES.FEED}/${result.payload.sign.id}`);
    }
  };

  const handleLike = () => {
    if (!sign) return;
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    dispatch(likePancreatitisSign({ id: sign.id, like: !sign.is_liked }));
  };

  if (!sign) {
    return (
      <div id="feed-page" className="page active">
        {!loading && (
          <div className="feed-overlay">
            <div className="feed-info">
              <div className="feed-title">Признак не найден</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const videoSrc = videoOrDefault(sign.video_url);
  const heartIcon = isAuthenticated && !sign.is_liked ? "fa-regular fa-heart" : "fa-solid fa-heart";

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
          <button
            type="button"
            className="action-btn like-btn"
            aria-label="Лайк"
            disabled={loading}
            onClick={handleLike}
          >
            <i className={heartIcon} />
            <span id="feed-likes">{sign.likes_count}</span>
          </button>
          <button
            type="button"
            className="feed-next-btn"
            aria-label="Следующий признак"
            disabled={loading}
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
