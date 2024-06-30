import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";
import './Home.css';
import Recommend from "./Recommend/Recommend";
import PostCard from "./PostCard/PostCard";


export default function Home() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setLocations } = useContext(AppContext);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  useEffect(() => {
    // 지역 조회 API 호출
    const fetchLocations = async () => {
      await axiosInstance.get("api/locations")
        .then((res) => {
          const data = res.data;
          if(Array.isArray(data)) {
            setLocations(data);
          } else {
            console.error("Fetched locations data is not an array:", data);
            setLocations([]);
          };
        })
        .catch((err) => {
          console.error("Error fetching locations:", err);
          setLocations([]); // 에러 발생 시 빈 배열로 초기화
        });
      };

    // 인증 API 호출
    const checkAuthentication = async () => {
      await axiosInstance.get("api/auth/check")
        .then((res) => {
          if (res.data.isAuthenticated) {
            setIsLogin(true);
          };
        })
        .catch ((err) => {
          setIsLogin(false);
        });
    };
    
    fetchLocations();
    checkAuthentication();
  }, []);

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
  const onClickSigninButton = () => {
    if (!isLogin) {
      goToSignIn();
    };
  };

  return (
    <div className="DNAHome">
      <div className="Header">
        <div className="account">
          <button className="loginBtn" onClick={onClickLoginButton}>{!isLogin ? 'Login' : 'Logout'}</button>
          {!isLogin ? <button className="signInBtn" onClick={onClickSigninButton}>Sign Up</button> : null}
        </div>
      </div>
      <Recommend />
      <PostCard />
    </div>
  );
}
