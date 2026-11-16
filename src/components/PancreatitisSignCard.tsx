import { FC, MouseEvent, SyntheticEvent } from "react";
import { Badge, Card } from "react-bootstrap";
import { DEFAULT_IMAGE, imageOrDefault } from "../modules/pancreatitisDefaults";

interface Props {
  title: string;
  stage: string;
  image_url: string;
  likes_count: number;
  onClick: () => void;
  onDelete?: () => void;
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (!img.src.endsWith(DEFAULT_IMAGE)) {
    img.src = DEFAULT_IMAGE;
  }
};

export const PancreatitisSignCard: FC<Props> = ({ title, stage, image_url, likes_count, onClick, onDelete }) => {
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <Card onClick={onClick}>
      <Card.Img
        bsPrefix="card-img"
        src={imageOrDefault(image_url)}
        alt={title}
        onError={handleImageError}
      />
      {onDelete && (
        <div className="card-delete-form">
          <button type="button" className="card-delete-btn" aria-label="Удалить" onClick={handleDelete}>
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      )}
      <Card.Body bsPrefix="card-content">
        <Card.Title as="div">{title}</Card.Title>
        <Badge bsPrefix="card-tag" bg="">
          {stage}
        </Badge>
        <div className="card-footer">
          <i className="fa-solid fa-heart" /> {likes_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PancreatitisSignCard;
