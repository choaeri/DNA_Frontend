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
      <img className="dnaHome" src="img/DNAHome.webp" alt="DNAHome"></img>
      <div className="rmdBtnContent" onClick={goToSurvey}>
        <p>Find the perfect workation spot for you</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10.5" fill="black"/>
          <path d="M8.25 12L15 12" stroke="white"/>
          <path d="M12.6426 9L15.6426 12L12.6426 15" stroke="white"/>
        </svg>
      </div>
      {isLoginPopup && <LoginPopup message={'Please log in to access this feature.'} />}
    </div>
  );
};