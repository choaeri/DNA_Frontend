import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";
import './Home.css';
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export default function Home() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AppContext); // isLogin도 useContext로 부터 추출

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const axios = async () => {
      // 인증 API 호출
      axiosInstance.get("api/auth/check")
        .then(response => {
          if (response.data.isAuthenticated) {
            setIsLogin(true);
          };
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
        });

      axiosInstance.post("api/posts")
        .then((res) => {
          console.log(res);
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
        });
    };
    axios();
  }, []);

  // 로그아웃 API 호출
  const logout = async () => {
    await axiosInstance.post("api/auth/logout") // 서버에 로그아웃 요청을 보냄
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
          <Card
            className="card"
            hoverable
            cover={<img alt="sokcho" src={`https://cdn.woman.chosun.com/news/photo/202204/97384_80024_1440.jpg`} />}
          >
            <Meta title="Sokcho" />
          </Card>
          <Card
            className="card"
            hoverable
            cover={<img alt="chuncheon" src={`https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202104/15/9dc7194a-30cc-4005-aabc-372e362b29f9.jpg`} />}
          >
            <Meta title="Chuncheon" />
          </Card>
          <Card
            className="card"
            hoverable
            cover={<img alt="yangyang" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbXZWlokJE_MLQc1YqROH2doJihNzVIWxqg&s`} />}
          >
            <Meta title="Yangyang" />
          </Card>
        </div>
      </div>
    </div>
  );
};
