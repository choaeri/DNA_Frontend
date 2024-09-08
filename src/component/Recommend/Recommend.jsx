import { RightCircleFilled } from "@ant-design/icons";
import "./Recommend.css";
import { useNavigate } from "react-router-dom";

export default function Recommend () {
  const navigate = useNavigate();

  return (
    <div className="RmdContent">
      <div className="rmdTitle">
        <span>Recommendation<br />of Workation<br />for Digital Nomads</span>
      </div>
      <img className="dnaHome" src="img/DNAHome.png" alt="DNAHome"></img>
      <div className="rmdBtnContent" onClick={() => navigate("/survey")}>
        <p>Find the perfect workation spot for you</p>
        <RightCircleFilled className="recommendBtn" />
      </div>
    </div>
  );
};