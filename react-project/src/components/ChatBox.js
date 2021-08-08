import { dbService, countService } from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { mbtiColorArray } from "contents";

const ChatBox = ({ nweetObj, isOwner }) => {
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  //for badge box

  const creatorType =
    nweetObj.creatorType && nweetObj.creatorType.toUpperCase();
  const creatorTypeColor = mbtiColorArray[nweetObj.creatorType];
  const creatorTypeUrl = `https://img.shields.io/badge/${creatorType}-${creatorTypeColor}?style=flat-square`;

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete it?");
    if (ok) {
      await dbService.doc(`mbti-chat-${mbtiType}/${nweetObj.id}`).delete();
      await dbService
        .collection("mbti-chat-count")
        .doc("U4cBg755pLzeo5Mi8BMe")
        .update({
          [mbtiType]: countService.FieldValue.increment(-1),
        });
    }
  };

  return (
    <div className="chat-box">
      <>
        <span>
          <img alt="type" src={creatorTypeUrl} />
        </span>
        <span>{nweetObj.creatorNickname}</span>
        <br></br>
        <span>{nweetObj.createdAt.month}</span>
        <span>/</span>
        <span>{nweetObj.createdAt.day}</span>
        <br></br>
        <span>{nweetObj.createdAt.hour}</span>
        <span>:</span>
        <span>{nweetObj.createdAt.minute}</span>
        <h4>{nweetObj.text}</h4>
        {isOwner && (
          <>
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </>
        )}
      </>
      <br></br>
    </div>
  );
};

export default ChatBox;
