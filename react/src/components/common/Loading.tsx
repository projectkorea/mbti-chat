import { mbtiArray } from "src/utils/MBTIContents";
import * as MbtiSVG from "utils/static";

function Loading() {
  const mbtiType =
    mbtiArray[Math.floor(Math.random() * mbtiArray.length)]["type"] as keyof typeof MbtiSVG;

  return (
    <>
      <div className="flex flex-row flex-wrap relative h-[80vh] w-[80vw]">
        <div className="inline-block absolute top-[80%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 z-[3]">
          <div className="loader-1 center">
            <span></span>
          </div>
          <br />
          <h1 className="font-['ONE-Mobile-POP'] text-[28px]">
            로딩중...
          </h1>
          <br />
        </div>
        <img
          className="loader-char absolute z-[2] w-[300px] h-[300px] top-1/2 left-[62%] transform -translate-x-1/2 -translate-y-1/2"
          alt="char"
          src={MbtiSVG[mbtiType]}
        />
      </div>
    </>
  );
}

export default Loading;
