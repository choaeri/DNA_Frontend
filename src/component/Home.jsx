import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { isLogin, setIsLogin } = useContext(AppContext); // isLogin도 useContext로 부터 추출

  const goToLogin = () => {
    navigate("/login");
  };

  // 인증 API 호출
  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/check", { withCredentials: true })
      .then(response => {
        if (response.data.isAuthenticated) {
          setIsLogin(true);
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // 로그아웃 API 호출
  const logout = async () => {
    await axiosInstance.post("api/auth/logout", {}) // 서버에 로그아웃 요청을 보냄
      .then(() => {
        setIsLogin(false); // 응답을 받으면 로그인 상태를 업데이트
        window.location.reload();
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  };

  // 버튼 클릭 핸들러 수정
  const handleButtonClick = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      logout();
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>{!isLogin ? '로그인' : '로그아웃'}</button>
      <div>테스트 API 호출</div>
      {userData && <div>인증 성공, username: {userData.username}</div>}
      {!userData && <div>인증 전</div>}
    </div>
  );
};
