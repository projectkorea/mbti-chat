//profile에서 타입고를 때와 chat방에서 사용

import React from "react";
import { mbtiColorArray } from "contents";

const MbtiBadge = ({ mbtiType }) => {
  //Badge box 만들기: 이름`
  const creatorTypeUpper = mbtiType.toUpperCase();
  const creatorTypeColor = mbtiColorArray[mbtiType];
  const creatorTypeUrl = `https://img.shields.io/badge/${creatorTypeUpper}-${creatorTypeColor}?style=flat-square`;

  return <img alt="type" src={creatorTypeUrl} />;
};

export default MbtiBadge;
