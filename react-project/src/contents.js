import { dbService } from "myBase";

//mbti chat별 메세지 개수 불러오기
dbService
  .collection("mbti-chat-count")
  .doc("U4cBg755pLzeo5Mi8BMe")
  .get()
  .then((doc) => {
    array.map((element) => {
      console.log(element["count"]);
      element["count"] = doc.data()[element.type];
    });
  });

const array = [
  {
    type: "intj",
    count: 1,
  },
  {
    type: "intp",
    count: 0,
  },
  {
    type: "entj",
    count: 0,
  },
  {
    type: "entp",
    count: 0,
  },
  {
    type: "infj",
    count: 0,
  },
  {
    type: "infp",
    count: 0,
  },
  {
    type: "enfj",
    count: 0,
  },
  {
    type: "enfp",
    count: 0,
  },
  {
    type: "istj",
    count: 0,
  },
  {
    type: "isfj",
    count: 0,
  },
  {
    type: "esfj",
    count: 0,
  },
  {
    type: "estj",
    count: 0,
  },
  {
    type: "istp",
    count: 0,
  },
  {
    type: "isfp",
    count: 0,
  },
  {
    type: "estp",
    count: 0,
  },
  {
    type: "esfp",
    count: 0,
  },
];

export default array;
