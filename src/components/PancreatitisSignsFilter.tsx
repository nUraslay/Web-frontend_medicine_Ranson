import { CSSProperties, FC, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  maxValue: number;
  setMaxValue: (value: number) => void;
  sliderMax: number;
  loading?: boolean;
  onSubmit: () => void;
}

export const PancreatitisSignsFilter: FC<Props> = ({
  maxValue,
  setMaxValue,
  sliderMax,
  loading = false,
  onSubmit,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const percent = sliderMax > 0 ? (maxValue / sliderMax) * 100 : 100;

  return (
    <Form className="search-form" onSubmit={handleSubmit}>
      <div className="filter-row">
        <div className="filter-box">
          <span className="filter-value">{maxValue}</span>
          <Form.Range
            bsPrefix="filter-slider"
            min={0}
            max={sliderMax}
            step={1}
            value={maxValue}
            style={{ "--pct": `${percent}%` } as CSSProperties}
            onChange={(event) => setMaxValue(Number(event.target.value))}
          />
        </div>
        <Button
          type="submit"
          bsPrefix="submit-btn"
          variant=""
          className="search-btn"
          disabled={loading}
          aria-label="Применить фильтр"
        >
          <i className="fa-solid fa-sliders" />
        </Button>
      </div>
    </Form>
  );
};

export default PancreatitisSignsFilter;
