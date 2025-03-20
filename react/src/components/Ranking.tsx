import { useEffect, useState } from "react";
import MbtiBadge from "common/MbtiBadge";

interface RankingProps {
  value: number;
  sum: number;
  unit: string;
  type: string;
  target: string;
}

function Ranking({ value, sum, unit, type, target }: RankingProps) {
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
      <div className="flex items-center">
        <div className="flex w-[50px]">
          <MbtiBadge mbtiType={type} />
        </div>
        <div className="flex">
          <div
            className="progress_wrapper w-[200px] justify-center"
          >
            <div className="progress">
              <div
                className={`progress-bar progress-bar-${barType} progress-bar-striped`}
                style={{ width: `${widthValue}%` }}
              ></div>
            </div>
          </div>
          <div>
            <h1 className="m-0 mx-[2px] text-xs">
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
