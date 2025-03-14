import PropTypes from "prop-types";
import { mbtiPronArray } from "utils/mbtiContent.js";
import { nickname } from "utils/nicknameGen.js";
import { MyBase } from "utils/myBase.js";
import { useUserStore } from "store/useStore.js";

function ProfileChooseBlock({ mbtiType }) {
  const { setTypeChoose } = useUserStore();

  const handleTypeClick = async () => {
    const msg = `${mbtiType.toUpperCase()}(${
      mbtiPronArray[mbtiType]
    })를 고르시겠습니까?`;

    if (window.confirm(msg)) {
      await MyBase.increaseCount("people", mbtiType);
      MyBase.updatePf({
        displayName: mbtiType,
        photoURL: nickname,
      });
      setTypeChoose(true);
    }
  };

  return (
    <button onClick={handleTypeClick}>
      <h1 className="profile-mbti-block--item">{mbtiType.toUpperCase()}</h1>
    </button>
  );
}

ProfileChooseBlock.propTypes = {
  mbtiType: PropTypes.string.isRequired,
  setTypeInput: PropTypes.func,
};

export default ProfileChooseBlock;
