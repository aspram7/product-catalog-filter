import { Fragment } from "react";
import Star from "./star";

import "./style.css";

const RateItem = ({ index, value, onClick }) => {
  return (
    <div className={`rate-item${value >= index ? " active" : ""}`} data-testid="rate">
      <div className="rate-star-first" onClick={() => onClick(index)} data-testid="first-side">
        <Star />
      </div>
      <div className={`rate-star-second${index - value === 0.5 ? " active" : ""}`} onClick={() => onClick(index - 0.5)}>
        <Star />
      </div>
    </div>
  );
};

const rateIndex = [5, 4, 3, 2, 1];

const Rate = ({ defaultValue = 0, readOnly = false, value, onChange }) => {
  return (
    <div className={`rate-container${readOnly ? " disabled" : ""}`}>
      <div className="rate-box">
        {rateIndex.map((index) => {
          return (
            <Fragment key={index}>
              <RateItem index={index} value={value || Math.round(defaultValue * 2) / 2} onClick={onChange} />
              {index !== 1 && <div className="rate-gap" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Rate;
