import { useCallback, useEffect, useState } from "react";
import Slider from "rc-slider";
import { debounce } from "../../utils/debounce";

import "rc-slider/assets/index.css";
import "./style.css";

const RangeSlider = ({ min = 0, max = 1000, value, onChange }) => {
  const [range, setRange] = useState(value);

  useEffect(() => {
    const range = JSON.parse(localStorage.getItem("filters"))?.price;

    if (range) {
      setRange(range);
    }
  }, []);

  const debouncedRange = debounce((value) => {
    onChange(value);
  });

  const handleChange = useCallback((value) => {
    setRange(value);
    debouncedRange(value);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="slider-container">
      <Slider range min={min} max={max} value={range} onChange={handleChange} />
      <div className="slider-inputs">
        <input type="number" value={range?.[0]} onChange={(e) => onChange([Number(e.target.value), range[1]])} />
        <input type="number" value={range?.[1]} onChange={(e) => onChange([range[0], Number(e.target.value)])} />
      </div>
    </div>
  );
};

export default RangeSlider;
