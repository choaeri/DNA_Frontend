import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal } from "@mui/material";
import "./LoginPopup.css";
import { useNavigate } from "react-router-dom";

export default function LoginPopup (props) {
  const {isLoginPopup, setIsLoginPopup} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <Modal 
        open={isLoginPopup} onClose={() => setIsLoginPopup(false)}
      >
        <section className="loginPopupSection">
          <div className="loginPopupModal">
            <div className="loginPopupHeader">
              <svg className="closeBtn" onClick={() => setIsLoginPopup(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M12.929 13.0713L27.0711 27.2134" stroke="black" strokeWidth="2"/>
                <path d="M27.071 13.0713L12.9289 27.2134" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <div className="loginPopupCnt">
              <div className="expCnt">
                <span>{props.message}</span>
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