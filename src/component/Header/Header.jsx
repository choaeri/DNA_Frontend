import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../common/func/axios";
import "./Header.css";
import useLocalStorage from '../../utils/useLocalStorage';

export default function Header () {
  const { isLoggedIn, processLogout } = useLocalStorage();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  // 로그아웃 API 호출
  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      processLogout();
      window.location.reload();
    } catch (err) {
      console.error("Error during logout:", err);
    };
  };

  // 로그인 버튼 클릭
  const onClickLoginButton = () => {
    if (!isLoggedIn) {
      goToLogin();
    };
  };

  // 로그아웃 버튼 클릭
  const onClickLogoutButton = () => {
    if (isLoggedIn) {
      logout();
    };
  };

  // 회원가입 버튼 클릭
  const onClickSignupButton = () => {
    if (!isLoggedIn) {
      goToSignUp();
    };
  };

  return (
    <div className="Header">
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