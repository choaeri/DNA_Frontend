import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../common/func/axios";
import "./Header.css";
import useLocalStorage from '../../utils/useLocalStorage';

export default function Header () {
  const { isLoggedIn, processLogout } = useLocalStorage();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      processLogout();
      window.location.reload();
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const onClickLoginButton = () => {
    if (!isLoggedIn) {
      goToLogin();
    }
  };

  const onClickLogoutButton = () => {
    if (isLoggedIn) {
      logout();
    }
  };

  const onClickSignupButton = () => {
    if (!isLoggedIn) {
      goToSignUp();
    }
  };

  return (
    <div className="Header">
      <div className="logo" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src="img/DNALogo.png" alt="Logo" className="logoImage" />
      </div>
      <div className="account">
        { !isLoggedIn ? 
          <>
            <button className="loginBtn" onClick={onClickLoginButton}>Login</button>
            <button className="signUpBtn" onClick={onClickSignupButton}>Sign Up</button>
          </> : 
          <button className="loginBtn" onClick={onClickLogoutButton}>Logout</button>
        }
      </div>
    </div>
  );
};