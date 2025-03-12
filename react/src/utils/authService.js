import { mbtiArray } from 'utils/mbtiContent.js';
import { db } from 'utils/myBase.js';

const checkFromEmailLogin = (user) => {
  //구글, 페이스북, 이메일 로그인
  if (user.providerData.length !== 0) {
    const fromEmailLogin = user.providerData[0]['uid'].indexOf('@') !== -1;
    if (fromEmailLogin) {
      return true;
    }
  }
  // 네이버 또는 카카오 로그인
  return false;
};

// type 골랐는지 확인해서 프로필에 선택사항 주기
const checkType = (user) => {
  return mbtiArray.some((element) => {
    return user.displayName === element['type'];
  });
};

// 자유 게시판에 내 채팅방 만들었는지 확인하기
const checkCanMakeRoom = async (user) => {
  await db
    .collection('chat-room')
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return false;
      } else {
        return true;
      }
    });
};

export { checkType, checkCanMakeRoom, checkFromEmailLogin };
