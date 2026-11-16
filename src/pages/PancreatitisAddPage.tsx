import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../pancreatitisRoutes";
import {
  createPancreatitisSignDraft,
  getPancreatitisSignDraft,
  publishPancreatitisSign,
} from "../slices/pancreatitisSignsSlice";
import { useAppDispatch, useAppSelector } from "../store";

const PancreatitisAddPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.pancreatitisUser.isAuthenticated);
  const { draft, loading, error } = useAppSelector((state) => state.pancreatitisSigns);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File>();
  const [video, setVideo] = useState<File>();
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPancreatitisSignDraft());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (draft) {
      setTitle(draft.title);
      setDescription(draft.description);
      setStage(draft.stage);
      setThresholdValue(draft.threshold_value ? String(draft.threshold_value) : "");
    }
  }, [draft]);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const handleVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideo(file);
  };

  const handleCreateDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createPancreatitisSignDraft({ title, image, video }));
  };

  const handlePublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft) return;
    const result = await dispatch(
      publishPancreatitisSign({
        id: draft.id,
        title,
        description,
        stage,
        threshold_value: Number(thresholdValue),
      })
    );
    if (publishPancreatitisSign.fulfilled.match(result)) {
      navigate(`${ROUTES.FEED}/${result.payload.id}`);
    }
  };

  if (draft) {
    return (
      <div id="add-page" className="page active">
        <h2 className="page-title">Новая карточка</h2>

        <Form onSubmit={handlePublish}>
          {error && <div className="form-error">{error}</div>}

          <Form.Group bsPrefix="form-group">
            <Form.Label bsPrefix="form-label">Медиафайл (Фото/Видео)</Form.Label>
            <div className="media-upload-row">
              <div className="upload-area media-locked">
                <i className="fa-solid fa-image" />
                <div>Загружено</div>
              </div>
              <div className="upload-area media-locked">
                <i className="fa-solid fa-camera" />
                <div>Загружено</div>
              </div>
            </div>
          </Form.Group>

          <Form.Group bsPrefix="form-group">
            <Form.Label bsPrefix="form-label">Тема / Критерий</Form.Label>
            <Form.Control
              bsPrefix="form-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group bsPrefix="form-group">
            <Form.Label bsPrefix="form-label">Описание критерия</Form.Label>
            <Form.Control
              as="textarea"
              bsPrefix="form-textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group bsPrefix="form-group">
            <Form.Label bsPrefix="form-label">Этап оценки</Form.Label>
            <Form.Control
              bsPrefix="form-input"
              placeholder="При поступлении / Через 48 часов"
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group bsPrefix="form-group">
            <Form.Label bsPrefix="form-label">Пороговое значение</Form.Label>
            <Form.Control
              bsPrefix="form-input"
              type="number"
              step="any"
              value={thresholdValue}
              onChange={(event) => setThresholdValue(event.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" bsPrefix="submit-btn" variant="" disabled={loading}>
            Опубликовать
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div id="add-page" className="page active">
      <h2 className="page-title">Новая карточка</h2>

      <Form onSubmit={handleCreateDraft}>
        {error && <div className="form-error">{error}</div>}

        <Form.Group bsPrefix="form-group">
          <Form.Label bsPrefix="form-label">Медиафайл (Фото/Видео)</Form.Label>
          <div className="media-upload-row">
            <label className="upload-area">
              <i className="fa-solid fa-image" />
              <div>{image ? image.name : "Загрузить"}</div>
              <input type="file" accept="image/*" hidden onChange={handleImage} />
            </label>
            <label className="upload-area">
              <i className="fa-solid fa-camera" />
              <div>{video ? video.name : "Загрузить"}</div>
              <input type="file" accept="video/*" hidden onChange={handleVideo} />
            </label>
          </div>
        </Form.Group>

        <Form.Group bsPrefix="form-group">
          <Form.Label bsPrefix="form-label">Тема / Критерий</Form.Label>
          <Form.Control
            bsPrefix="form-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" bsPrefix="submit-btn" variant="" disabled={loading}>
          Далее
        </Button>
      </Form>
    </div>
  );
};

export default PancreatitisAddPage;
