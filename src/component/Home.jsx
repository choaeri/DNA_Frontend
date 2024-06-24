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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 인증 API 호출
        const authResponse = await axiosInstance.get("api/auth/check");
        if (authResponse.data.isAuthenticated) {
          setIsLogin(true);
        }

        // 카드 데이터 API 호출
        const cardsResponse = await axiosInstance.get("api/cards");
        setLocations(cardsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [setIsLogin]);

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
