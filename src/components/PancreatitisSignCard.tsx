import { FC, SyntheticEvent } from "react";
import { Badge, Card } from "react-bootstrap";
import { DEFAULT_IMAGE, imageOrDefault } from "../modules/pancreatitisDefaults";

interface Props {
  title: string;
  stage: string;
  image_url: string;
  likes_count: number;
  onClick: () => void;
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (!img.src.endsWith(DEFAULT_IMAGE)) {
    img.src = DEFAULT_IMAGE;
  }
};

export const PancreatitisSignCard: FC<Props> = ({ title, stage, image_url, likes_count, onClick }) => (
  <Card onClick={onClick}>
    <Card.Img
      bsPrefix="card-img"
      src={imageOrDefault(image_url)}
      alt={title}
      onError={handleImageError}
    />
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

export default PancreatitisSignCard;
