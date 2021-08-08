import MbtiBlock from "components/MbtiBlock";

function Home({ mbtiArray }) {
  return (
    <div className="mbti-block--container">
      {mbtiArray.map((element) => (
        <MbtiBlock
          key={element.type}
          mbtiType={element.type}
          mbtiCount={element.count}
          mbtiCitizen={element.citizen}
          className="mbti-block"
        />
      ))}
    </div>
  );
}

export default Home;
