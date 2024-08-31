import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal } from "@mui/material";
import "./LoginPopup.css";
import { useNavigate } from "react-router-dom";

export default function LoginPopup () {
  const {isLoginPopup, setIsLoginPopup} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <Modal 
        open={isLoginPopup} onClose={() => setIsLoginPopup(false)}
      >
        <section className="popupSection">
          <div className="popupModal">
            <div className="popupHeader">
              <svg className="closeBtn" onClick={() => setIsLoginPopup(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M12.929 13.0713L27.0711 27.2134" stroke="black" strokeWidth="2"/>
                <path d="M27.071 13.0713L12.9289 27.2134" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <div className="popupCnt">
              <div className="expCnt">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 11.2506V19.5006C21 19.8984 20.842 20.2799 20.5607 20.5612C20.2794 20.8426 19.8978 21.0006 19.5 21.0006H4.5C4.10218 21.0006 3.72064 20.8426 3.43934 20.5612C3.15804 20.2799 3 19.8984 3 19.5006V4.50059C3 4.10277 3.15804 3.72123 3.43934 3.43993C3.72064 3.15863 4.10218 3.00059 4.5 3.00059H12.75C12.9489 3.00059 13.1397 3.07961 13.2803 3.22026C13.421 3.36091 13.5 3.55168 13.5 3.75059C13.5 3.9495 13.421 4.14027 13.2803 4.28092C13.1397 4.42157 12.9489 4.50059 12.75 4.50059H4.5V19.5006H19.5V11.2506C19.5 11.0517 19.579 10.8609 19.7197 10.7203C19.8603 10.5796 20.0511 10.5006 20.25 10.5006C20.4489 10.5006 20.6397 10.5796 20.7803 10.7203C20.921 10.8609 21 11.0517 21 11.2506ZM21.5306 6.53122L12.5306 15.5312C12.4609 15.6008 12.3782 15.6561 12.2871 15.6937C12.1961 15.7313 12.0985 15.7507 12 15.7506H9C8.80109 15.7506 8.61032 15.6716 8.46967 15.5309C8.32902 15.3903 8.25 15.1995 8.25 15.0006V12.0006C8.24992 11.9021 8.26926 11.8045 8.3069 11.7135C8.34454 11.6224 8.39975 11.5397 8.46937 11.47L17.4694 2.46996C17.539 2.40023 17.6217 2.34491 17.7128 2.30717C17.8038 2.26943 17.9014 2.25 18 2.25C18.0986 2.25 18.1962 2.26943 18.2872 2.30717C18.3783 2.34491 18.461 2.40023 18.5306 2.46996L21.5306 5.46996C21.6004 5.53962 21.6557 5.62234 21.6934 5.71338C21.7312 5.80443 21.7506 5.90203 21.7506 6.00059C21.7506 6.09915 21.7312 6.19675 21.6934 6.2878C21.6557 6.37884 21.6004 6.46156 21.5306 6.53122ZM19.9369 6.00059L18 4.0609L16.8103 5.25059L18.75 7.19028L19.9369 6.00059Z" fill="#4F5257"/>
                  </svg>
                </div>
                <span>토큰 만료됨</span>
              </div>
              <div className="schedCnt">
                <img />
                <div className="info">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="btnCnt">
              <button className="writeBtn" onClick={() => navigate("/login")}>
                <span>Go To Login</span>
              </button>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};