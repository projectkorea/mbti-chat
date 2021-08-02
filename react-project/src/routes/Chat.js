import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";

const Chat = ({ userObj }) => {
  console.log(`유저: ${userObj}`);
  const [nweets, setNweets] = useState([]);
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  useEffect(() => {
    dbService
      .collection(`mbti-chat-${mbtiType}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <h1>카운트 수:{}</h1>
      <ChatGen userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <ChatBox
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
