import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Cookies from 'js-cookie'; // js-cookie 라이브러리 import

export default function Home() {
  const { isLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(null);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  useEffect(() => {
    // JWT 토큰을 쿠키에서 가져옵니다.
    const token = Cookies.get('JWT-TOKEN');
    setJwtToken(token);
    console.log("JWT Token from cookie: ", token);
  }, []);

  return (
    <div>
      <button onClick={goToLogin}>{!isLogin ? '로그인' : '로그아웃'}</button>
      {!isLogin ? <button onClick={goToSignin}>회원가입</button> : null}
      {jwtToken && <p>JWT Token: {jwtToken}</p>}
    </div>
  );
};