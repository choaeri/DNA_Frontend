import { RightCircleFilled } from "@ant-design/icons";
import "./Recommend.css";

export default function Recommend () {
  return (
    <div className="RmdContent">
      <div className="rmdTitle">
        <span>Recommendation<br />of Workation<br />for Digital Nomads</span>
      </div>
      <img className="dnaHome" src="img/DNAHome.png" alt="DNAHome"></img>
      <div className="rmdBtnContent">
        <p>Find the perfect workation spot for you</p>
        <RightCircleFilled className="recommendBtn" />
      </div>
    </div>
  );
};