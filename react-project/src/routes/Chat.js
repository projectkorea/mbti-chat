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
      .orderBy("createdAt", "asc")
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
      <div style={{ marginTop: 30 }}>
        {userObj
          ? nweets.map((nweet) => (
              <ChatBox
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
              />
            ))
          : nweets.map((nweet) => <ChatBox key={nweet.id} nweetObj={nweet} />)}
      </div>
      {userObj ? <ChatGen userObj={userObj} /> : <ChatGen />}
    </div>
  );
};

export default Chat;
