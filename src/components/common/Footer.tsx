import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer font-['ELAND_Choice_M']">
      <h1 className="text-[#969696] m-5 logo-title-font">
        유유상종
      </h1>
      <h1>ProjectKorea {new Date().getFullYear()} &copy;</h1>
      <br />
      <h1>Image Copyright by https://www.16personalities.com</h1>
      <h1>This site is operated for non-commercial purposes.</h1>
      <br />
      <div>
        <button className="mr-2.5">
          <Link to="/qna/1">
            <h1 className="p-0.5">문의</h1>
          </Link>
        </button>
        <button>
          <Link to="/qna/2">
            <h1 className="p-0.5">개인정보처리방침</h1>
          </Link>
        </button>
      </div>
      <br />
    </div>
  );
}

export default Footer;
