import MbtiBlock from "components/MbtiBlock";
import contents from "contents";
import { dbService } from "myBase";

function Home() {
  return (
    <>
      <div>Home</div>
      {contents.map((mbtiType) => (
        <MbtiBlock
          mbtiType={mbtiType.type}
          mbtiCount={mbtiType.count}
          className="mbti-block"
        />
      ))}
    </>
  );
}

export default Home;
