import { mbtiColorArray } from "src/utils/mbtiIContents";

interface MbtiBadgeProps {
  mbtiType: string;
}

const MbtiBadge = ({ mbtiType = "FAIL" }: MbtiBadgeProps) => {
  const creatorTypeUpper = mbtiType.toUpperCase();
  const creatorTypeColor = mbtiColorArray[mbtiType.toLowerCase() as keyof typeof mbtiColorArray];
  const creatorTypeUrl = `https://img.shields.io/badge/${creatorTypeUpper}-${creatorTypeColor}?style=flat-square`;

  return <img alt="type" src={creatorTypeUrl} />;
};

export default MbtiBadge;
