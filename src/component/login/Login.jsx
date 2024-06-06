import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import axios from "axios";
import Home from "../Home";
import { useNavigate } from "react-router-dom";

export default function Login () {
  const { setIsLogin,
          loginId, setLoginId,
          loginPassword, setLoginPassword } = useContext(AppContext);
  const navigate = useNavigate();

  const onIdHandler = (e) => {
    setLoginId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleNaverLogin = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/oauth2/authorization/naver`; 
  };

  const handleKakaoLogin = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/oauth2/authorization/kakao`; 
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/oauth2/authorization/google`; 
  };

  const handleFaceBookLogin = (e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8080/oauth2/authorization/facebook`; 
  };

  const onClickLoginBtn = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_TOUR_API}` + '/auth/login', {
      username: loginId,
      password: loginPassword
    }, { withCredentials: true })
    .then(function (res) {
      navigate("/");
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column'}}>
        <label>Id</label>
        <input type='id' value={loginId} onChange={onIdHandler}/>
        <label>Password</label>
        <input type='password' value={loginPassword} onChange={onPasswordHandler}/>
        <br />
        <button onClick={onClickLoginBtn}>
          Login
        </button>
        <button>
          <a href="/signin">Signup</a>
        </button>
        <button onClick={handleNaverLogin}>
          Naver Login
        </button>
        <button onClick={handleKakaoLogin}>
          Kakao Login
        </button>
        <button onClick={handleGoogleLogin}>
          Google Login
        </button>
        <button onClick={handleFaceBookLogin}>
          FaceBook Login
        </button>
      </form>
    </div>
  )
};