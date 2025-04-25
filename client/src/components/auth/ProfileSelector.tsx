import { mbtiPronArray } from "src/utils/mbtiIContents";
import { nickname } from "utils/nicknameGen";
import { MyBase } from "utils/myBase.js";
import { useUserStore } from "store/useStore.js";

type MBTIType = keyof typeof mbtiPronArray;

interface ProfileSelectorProps {
  mbtiType: MBTIType;
  setTypeInput?: (type: string) => void;
}

function ProfileSelector({ mbtiType }: ProfileSelectorProps) {
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

export default ProfileSelector;
