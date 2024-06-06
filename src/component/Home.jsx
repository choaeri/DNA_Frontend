import { useNavigate } from "react-router-dom";
import Login from "./login/Login";
import Signin from "./signin/Signin";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Home () {
  const { isLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
    return <Login />
  };

  const goToSignin = () => {
    navigate("/signin");
    return <Signin />
  };
  
  return (
    <div>
      <button onClick={goToLogin}>{!isLogin ? '로그인' : '로그아웃'}</button>
      {!isLogin ? <button onClick={goToSignin}>회원가입</button> : null}
    </div>
  )
};