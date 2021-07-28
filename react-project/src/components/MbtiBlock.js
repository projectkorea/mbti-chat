import React from "react";
import { Link } from "react-router-dom";

function MbtiBlock({ mbtiType }) {
  return (
    <>
      <div>
        <button>
          <Link to={`chat/${mbtiType}`}>
            <h1>{mbtiType}</h1>
          </Link>
        </button>
      </div>
    </>
  );
}

export default MbtiBlock;
