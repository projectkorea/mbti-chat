import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";

const Chat = ({ userObj, signInEmail, typeInit }) => {
  const [chats, setChats] = useState([]);
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    dbService
      .collection(`mbti-chat-${mbtiType}`)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatArray);
      });
  });

  return (
    <div className="container">
      <div style={{ marginTop: 30 }}>
        {userObj
          ? chats.map((nweet) => (
              <ChatBox
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
                userObj={userObj}
              />
            ))
          : chats.map((nweet) => <ChatBox key={nweet.id} nweetObj={nweet} />)}
      </div>
      {userObj ? (
        <ChatGen
          userObj={userObj}
          signInEmail={signInEmail}
          typeInit={typeInit}
        />
      ) : (
        <ChatGen />
      )}
    </div>
  );
};

export default Chat;
