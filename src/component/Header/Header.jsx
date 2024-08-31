import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../common/func/axios";
import "./Header.css";
import useLocalStorage from '../../utils/useLocalStorage';
import { Dropdown, Menu, Space } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Header () {
  const {errMessageCheck} = useContext(AppContext);
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
      navigate("/");
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
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

  const dropdownMenu = (
    <Menu>
      <Menu.Item>Recommended Areas</Menu.Item>
      <Menu.Item onClick={() => navigate("/mypage/likes")}>Likes</Menu.Item>
      <Menu.Item onClick={() => navigate("/mypage/schedule")}>Schedule</Menu.Item>
      <Menu.Item onClick={() => navigate("/mypage/account")}>Account</Menu.Item>
      <Menu.Item onClick={onClickLogoutButton}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="Header">
      <div className="logo" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src="/img/DNALogo.png" alt="Logo" className="logoImage" />
      </div>
      <div className="account">
        { !isLoggedIn ? 
          <>
            <button className="loginBtn" onClick={onClickLoginButton}>Login</button>
            <button className="signUpBtn" onClick={onClickSignupButton}>Sign Up</button>
          </> : 
          <>
            <Dropdown
              overlay={dropdownMenu}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M26.875 18.75C26.875 20.1097 26.4718 21.439 25.7164 22.5695C24.9609 23.7001 23.8872 24.5813 22.631 25.1017C21.3747 25.622 19.9924 25.7582 18.6588 25.4929C17.3251 25.2276 16.1001 24.5728 15.1386 23.6114C14.1772 22.6499 13.5224 21.4249 13.2571 20.0912C12.9918 18.7576 13.128 17.3753 13.6483 16.1191C14.1687 14.8628 15.0499 13.7891 16.1805 13.0336C17.311 12.2782 18.6403 11.875 20 11.875C21.8227 11.8771 23.5702 12.6021 24.8591 13.8909C26.1479 15.1798 26.8729 16.9273 26.875 18.75ZM36.25 20C36.25 23.2139 35.297 26.3557 33.5114 29.028C31.7258 31.7003 29.1879 33.7831 26.2186 35.013C23.2493 36.243 19.982 36.5648 16.8298 35.9378C13.6776 35.3107 10.7821 33.7631 8.50952 31.4905C6.23692 29.2179 4.68926 26.3224 4.06225 23.1702C3.43524 20.018 3.75704 16.7507 4.98696 13.7814C6.21689 10.8121 8.29969 8.27419 10.972 6.48862C13.6443 4.70305 16.7861 3.75 20 3.75C24.3084 3.75455 28.439 5.46806 31.4855 8.51454C34.5319 11.561 36.2455 15.6916 36.25 20ZM33.75 20C33.748 18.1493 33.3728 16.318 32.6468 14.6156C31.9208 12.9132 30.8589 11.3747 29.5247 10.0921C28.1905 8.80949 26.6113 7.80915 24.8816 7.15088C23.1519 6.4926 21.3072 6.18992 19.4578 6.26094C12.0984 6.54531 6.22969 12.675 6.25001 20.0391C6.25706 23.3914 7.49348 26.6248 9.72501 29.1266C10.6338 27.8085 11.7882 26.6779 13.125 25.7969C13.239 25.7216 13.3745 25.6857 13.5108 25.6948C13.6471 25.7038 13.7766 25.7572 13.8797 25.8469C15.5784 27.3162 17.7493 28.1248 19.9953 28.1248C22.2413 28.1248 24.4122 27.3162 26.1109 25.8469C26.214 25.7572 26.3436 25.7038 26.4799 25.6948C26.6162 25.6857 26.7517 25.7216 26.8656 25.7969C28.2041 26.6775 29.3602 27.808 30.2703 29.1266C32.5129 26.6157 33.7517 23.3665 33.75 20Z" fill="black"/>
                  </svg>
                </Space>
              </a>
            </Dropdown>
          </>
        }
      </div>
    </div>
  );
};