import { useEffect, useState } from "react";
import MbtiBadge from "common/MbtiBadge";
import PropTypes from "prop-types";

function Ranking({ value, sum, unit, type, target }) {
  const widthValue = (value / sum) * 100;
  const [barType, setBarType] = useState("");

  useEffect(() => {
    if (target === "msg") setBarType("danger");
    else if (target === "people") setBarType("waring");
    else if (target === "goingToBeDevelop1") setBarType("info");
    else if (target === "goingToBeDevelop2") setBarType("success");
  }, [target]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", width: "50px" }}>
          <MbtiBadge mbtiType={type} />
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="progress_wrapper"
            style={{ width: "200px", justifyContent: "center" }}
          >
            <div className="progress">
              <div
                className={`progress-bar progress-bar-${barType} progress-bar-striped`}
                style={{ width: `${widthValue}%` }}
              ></div>
            </div>
          </div>
          <div>
            <h1 style={{ margin: "0px 2px", fontSize: "12px" }}>
              {value}
              {unit}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

Ranking.propTypes = {
  value: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default Ranking;
