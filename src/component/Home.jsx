import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";
import './Home.css';
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export default function Home() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AppContext);
  const [locations, setLocations] = useState([]);

  const goToLogin = () => {
    navigate("/login");
  };

  // 인증 API 호출
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authResponse = await axiosInstance.get("api/auth/check");
        if (authResponse.data.isAuthenticated) {
          setIsLogin(true);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
      }
    };
    checkAuthentication();
  }, [setIsLogin]);

  // 지역 조회 API 호출
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const cardsResponse = await axiosInstance.get("api/locations");
        const fetchedLocations = cardsResponse.data;

        // fetchedLocations가 배열인지 확인
        if (Array.isArray(fetchedLocations)) {
          setLocations(fetchedLocations);
        } else {
          console.error("Fetched locations data is not an array:", fetchedLocations);
          setLocations([]);
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        setLocations([]); // 에러 발생 시 빈 배열로 초기화
      }
    };
    fetchLocations();
  }, []);

  // 로그아웃 API 호출
  const logout = async () => {
    try {
      await axiosInstance.post("api/auth/logout");
      setIsLogin(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
    <div className="DNAHome">
      <div className="Header">
        <button className="loginBtn" onClick={handleButtonClick}>{!isLogin ? '로그인' : '로그아웃'}</button>
      </div>
      <div className="RmdContent">
        <button className="recommendBtn">추천받기</button>
      </div>
      <div className="CardContent">
        <header>
          <h2>Best Workation Recommend</h2>
        </header>
        <button className="onMap">map</button>
        <div className="cardCnt">
          {locations.map((location, index) => (
            <Card
              key={index}
              className="card"
              hoverable
              cover={<img alt={location.name} src={location.thumbNail} />}
            >
              <Meta title={location.name} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
