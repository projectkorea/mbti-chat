import { mbtiColorArray } from "utils/mbtiContent.js";
import PropTypes from "prop-types";

const MbtiBadge = ({ mbtiType = "FAIL" }) => {
  const creatorTypeUpper = mbtiType.toUpperCase();
  const creatorTypeColor = mbtiColorArray[mbtiType];
  const creatorTypeUrl = `https://img.shields.io/badge/${creatorTypeUpper}-${creatorTypeColor}?style=flat-square`;

  return <img alt="type" src={creatorTypeUrl} />;
};

MbtiBadge.propTypes = {
  mbtiType: PropTypes.string.isRequired,
};

export default MbtiBadge;
