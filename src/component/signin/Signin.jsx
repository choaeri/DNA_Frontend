import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import axios from "axios";
import Home from "../Home";
import { useNavigate } from "react-router-dom";

export default function Signin () {
  const { signInUserName, setSignInUserName,
          signInPassword, setSignInPassword,
          signInEmail, setSignInEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const onUserNameHandler = (e) => {
    setSignInUserName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setSignInPassword(e.target.value);
  };

  const onEmailHandler = (e) => {
    setSignInEmail(e.target.value);
  };

  const onClickSigninBtn = () => {
    axios.post(`${process.env.REACT_APP_TOUR_API}` + '/users', {
      username: signInUserName,
      password: signInPassword,
      email: signInEmail
    })
    .then(function (res) {
      console.log(res);
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
        <label>Username</label>
        <input type='username' value={signInUserName} onChange={onUserNameHandler}/>
        <label>Password</label>
        <input type='password' value={signInPassword} onChange={onPasswordHandler}/>
        <label>Email</label>
        <input type='email' value={signInEmail} onChange={onEmailHandler}/>
        <br />
        <button onClick={onClickSigninBtn}>
          SignIn
        </button>
      </form>
    </div>
  )
};