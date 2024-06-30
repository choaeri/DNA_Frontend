import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";
import './Home.css';
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export default function Home() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AppContext);
  const [locations, setLocations] = useState([]);
  const [like, setLike] = useState();

  const goToLogin = () => {
    navigate("/login");
  };

  // 지역 조회 API 호출
  useEffect(() => {
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
    fetchLocations();
  }, []);

  useEffect(() => {
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

  // 버튼 클릭 핸들러 수정
  const handleButtonClick = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      logout();
    }
  };

  const onClickLikeBtn = (e) => {
    const value = e.target.value;
    setLike(!like);
    const onClickLike = async () => {
      await axiosInstance.post("api/locations/")
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
      onClickLike();
  };

  return (
    <div className="DNAHome">
      <div className="Header">
        <div className="account">
          <button className="loginBtn" onClick={handleButtonClick}>{!isLogin ? 'Login' : 'Logout'}</button>
          <button className="signInBtn"><a href="/signin">Signup</a></button>
        </div>
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
              extra={<Button icon={like ? <HeartFilled /> : <HeartOutlined />} value={location.name} onClick={onClickLikeBtn} ></Button>}
              cover={<img alt={location.name} src={location.thumbNail} />}
            >
              <Meta title={location.name} />
              <p>temperature: {location.weatherInfo.temperature}</p>
              <p>humidity: {location.weatherInfo.humidity}</p>
              <p>cloudiness: {location.weatherInfo.cloudiness}</p>
              <p>windSpeed: {location.weatherInfo.windSpeed}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
