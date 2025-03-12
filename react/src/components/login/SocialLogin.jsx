import PropTypes from "prop-types";
import { loadFiles } from "utils/loadFiles";

const SocialLogin = ({ socialType }) => {
  const iconMap = loadFiles("icon");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt={socialType}
        src={iconMap[socialType]}
        style={{
          width: "20px",
          height: "20px",
          margin: "0px 2px 0px 0px",
        }}
      />
    </div>
  );
};

SocialLogin.propTypes = {
  socialType: PropTypes.string.isRequired,
};

export default SocialLogin;
