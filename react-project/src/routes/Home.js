import MbtiBlock from "components/MbtiBlock";

function Home({ mbtiArray }) {
  return (
    <>
      <div>Home</div>
      {mbtiArray.map((element) => (
        <MbtiBlock
          key={element.type}
          mbtiType={element.type}
          mbtiCount={element.count}
          mbtiCitizen={element.citizen}
          className="mbti-block"
        />
      ))}
    </>
  );
}

export default Home;
