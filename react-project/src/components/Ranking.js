import MbtiBadge from "components/MbtiBadge";

function Ranking({ value, sum, unit, type }) {
  const widthValue = (value / sum) * 100;
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            width: "50px",
          }}
        >
          <MbtiBadge mbtiType={type} />
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="progress_wrapper"
            style={{ width: "200px", justifyContent: "center" }}
          >
            <div className="progress">
              <div
                className="progress-bar progress-bar-danger progress-bar-striped"
                // progress-bar type: info waring success
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

export default Ranking;
