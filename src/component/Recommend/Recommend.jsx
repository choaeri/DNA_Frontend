import { RightCircleFilled } from "@ant-design/icons";
import "./Recommend.css";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import LoginPopup from "../LoginPopup/LoginPopup";

export default function Recommend () {
  const {isLoginPopup, setIsLoginPopup} = useContext(AppContext);
  const { isLoggedIn } = useLocalStorage();
  const navigate = useNavigate();

  const goToSurvey = () => {
    if(isLoggedIn) {
      navigate("/survey")
    } else {
      setIsLoginPopup(true);
    };
  };

  return (
    <div className="RmdContent">
      <div className="rmdTitle">
        <span>Recommendation<br />of Workation<br />for Digital Nomads</span>
      </div>
      <img className="dnaHome" src="img/DNAHome.png" alt="DNAHome"></img>
      <div className="rmdBtnContent" onClick={goToSurvey}>
        <p>Find the perfect workation spot for you</p>
        <RightCircleFilled className="recommendBtn" />
      </div>
      {isLoginPopup && <LoginPopup message={'Please log in to access this feature.'} />}
    </div>
  );
};