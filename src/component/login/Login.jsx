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

  const onClickLoginBtn = () => {
    axios.post('localhost:8080/api/login', {
      id: loginId,
      password: loginPassword
    })
    .then(function (res) {
      setIsLogin(true);
      console.log(res);
      alert('로그인에 성공하였습니다.');
      navigate("/");
      return (<Home />);
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
      </form>
    </div>
  )
};