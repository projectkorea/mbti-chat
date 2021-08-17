import { dbService, countService } from "myBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const DateGen = ({ userObj, typeChoose }) => {
  const url = window.location.href;
  const mbtiType = url.substring(url.lastIndexOf("/") + 1);
  const msgNumber = mbtiType + "-msg";
  const history = useHistory();
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(4);

  useEffect(() => {
    setInterval(() => setChatCount(4), 10000);
  }, []);


  const onSubmit = async (event, pass) => {
  
      const dateObj = {
        date: new Date(),
      };

      //메시지 등록
      await dbService.collection(`mbti-chat-${mbtiType}`).add(dateObj);

    }
  };
};

export default DateGen;
