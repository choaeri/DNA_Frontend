import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../common/func/axios";
import "./Header.css";

export default function Header () {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AppContext);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  // 로그아웃 API 호출
  const logout = async () => {
    try {
      await axiosInstance.post("api/auth/logout");
      setIsLogin(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    };
  };

  // 로그인 버튼 클릭
  const onClickLoginButton = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      logout();
    }
  };

  // 회원가입 버튼 클릭
  const onClickSignupButton = () => {
    if (!isLogin) {
      goToSignUp();
    };
  };

  return (
    <div className="Header">
      <div className="account">
        <button className="loginBtn" onClick={onClickLoginButton}>{!isLogin ? 'Login' : 'Logout'}</button>
        {!isLogin ? <button className="signUpBtn" onClick={onClickSignupButton}>Sign Up</button> : null}
      </div>
    </div>
  );
};