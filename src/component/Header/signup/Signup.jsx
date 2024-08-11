import { useContext, useState } from "react"
import { AppContext } from "../../../context/AppContext"
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../common/func/axios";

let newFieldErrors;
export default function Signup () {
  const { signUpUserName, setSignUpUserName,
          signUpPassword, setSignUpPassword,
          signUpEmail, setSignUpEmail,
          signUpVerifyCode, setSignUpVerifyCode,
          fieldErrors, setFieldErrors } = useContext(AppContext);
  const [isDuplicated, setIsDuplicated] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const navigate = useNavigate();

  const onUserNameHandler = (e) => {
    setSignUpUserName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setSignUpPassword(e.target.value);
  };
  const onPwdChkHandler = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onEmailHandler = (e) => {
    setSignUpEmail(e.target.value);
  };

  const onEmailVerifyCodeHandler = (e) => {
    setSignUpVerifyCode(e.target.value);
  };

  const handleSignup = (type) => {
    const match = {
      google: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/google`,
      kakao: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/kakao`
    };
    return (window.location.href = match[type]);
  };

  const onClickSignupBtn = async (e) => {
    const rules = signUpUserName !== "" && 
                  signUpPassword !== "" && 
                  passwordCheck !== "" && 
                  signUpEmail !== "" &&
                  validPwd
    if(rules) {
      
    }
    setFieldErrors({});
    const data = { username: signUpUserName, password: signUpPassword, email: signUpEmail };

    await axiosInstance.post('/api/users', data)
    .then((res) => {
      if(!isDuplicated && signUpUserName !== "" && signUpPassword !== "" && signUpEmail !== "" && signUpVerifyCode !== "") {
        notification.open({
          message: "회원가입 완료",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        });
        navigate("/");
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        const {
          data: { errorMessage },
        } = error.response;

        notification.open({
          message: "회원가입 실패",
          description: errorMessage,
          icon: <FrownOutlined style={{ color: "#ff3333" }} />
        });

        if (errorMessage) {
          newFieldErrors = {
            username: {
              validateStatus: "error",
              help: "Please input your username!",
            },
            password: {
              validateStatus: "error",
              help: "Please input your password!",
            },
            email: {
              validateStatus: "error",
              help: "Please input your email!",
            }
          };
          setFieldErrors(newFieldErrors);
        }
      }
    });
  };

  const onClickValidate = async () => {
    if(signUpUserName !== "") {
      const data = { username: signUpUserName };
      await axiosInstance.post("/api/users/name/check", data) 
        .then((res) => {
          if(res.data.isDuplicated === true) {
            setIsDuplicated(true);
          } else if(res.data.isDuplicated === false) {
            setIsDuplicated(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const verification = async () => {
    if(signUpEmail !== "") {
      const data = { email: signUpEmail };
      await axiosInstance.post("/api/users/email/code/send", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  const emailCheck = async () => {
    if(signUpEmail !== "" && signUpVerifyCode !== "") {
      const data = { email: signUpEmail, code: signUpVerifyCode };
      await axiosInstance.post("/api/users/email/code/verify", data)
        .then((res) => {
          const data = res.data;
          if(data.isVerified === true) {
            notification.open({
              message: "인증 완료",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
          }
        })
        .catch((err)=> {
          const {
            data: { errorMessage },
          } = err.response;
          notification.open({
            message: "인증 실패",
            description: errorMessage,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        })
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10}
  };
    
  const tailLayout = {
    wrapperCol: { offset: 11}
  };

  return (
    <div className="Account">
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" />
        <Card className="accountCnt signup" title={<span className="tit">Sign Up</span>}>
          <Form {...layout} autoComplete={"false"}>
            <Form.Item {...tailLayout}>
              <button className="accountBtn google" onClick={() => handleSignup("google")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 10.2125C19 9.54776 18.9403 8.90856 18.8295 8.29492H10V11.9213H15.0455C14.8281 13.0932 14.1676 14.0861 13.1747 14.7509V17.1032H16.2045C17.9773 15.4711 19 13.0676 19 10.2125Z" fill="#4285F4"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 19.375C12.5312 19.375 14.6533 18.5355 16.2045 17.1037L13.1746 14.7514C12.3351 15.3139 11.2613 15.6463 9.99991 15.6463C7.55815 15.6463 5.49139 13.9972 4.75417 11.7812H1.62207V14.2102C3.16468 17.2741 6.33514 19.375 9.99991 19.375Z" fill="#34A853"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.75426 11.781C4.56676 11.2185 4.46023 10.6177 4.46023 9.99978C4.46023 9.38188 4.56676 8.78103 4.75426 8.21853V5.78955H1.62216C0.987216 7.05518 0.625 8.48699 0.625 9.99978C0.625 11.5126 0.987216 12.9444 1.62216 14.21L4.75426 11.781Z" fill="#FBBC05"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 4.35369C11.3763 4.35369 12.6121 4.8267 13.5837 5.75568L16.2726 3.06676C14.6491 1.55398 12.5269 0.625 9.99991 0.625C6.33514 0.625 3.16468 2.72585 1.62207 5.78977L4.75417 8.21875C5.49139 6.00284 7.55815 4.35369 9.99991 4.35369Z" fill="#EA4335"/>
                </svg>
                <span>Sign up with Google</span>
              </button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <button className="accountBtn google" onClick={() => handleSignup("kakao")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 10.2125C19 9.54776 18.9403 8.90856 18.8295 8.29492H10V11.9213H15.0455C14.8281 13.0932 14.1676 14.0861 13.1747 14.7509V17.1032H16.2045C17.9773 15.4711 19 13.0676 19 10.2125Z" fill="#4285F4"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 19.375C12.5312 19.375 14.6533 18.5355 16.2045 17.1037L13.1746 14.7514C12.3351 15.3139 11.2613 15.6463 9.99991 15.6463C7.55815 15.6463 5.49139 13.9972 4.75417 11.7812H1.62207V14.2102C3.16468 17.2741 6.33514 19.375 9.99991 19.375Z" fill="#34A853"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.75426 11.781C4.56676 11.2185 4.46023 10.6177 4.46023 9.99978C4.46023 9.38188 4.56676 8.78103 4.75426 8.21853V5.78955H1.62216C0.987216 7.05518 0.625 8.48699 0.625 9.99978C0.625 11.5126 0.987216 12.9444 1.62216 14.21L4.75426 11.781Z" fill="#FBBC05"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 4.35369C11.3763 4.35369 12.6121 4.8267 13.5837 5.75568L16.2726 3.06676C14.6491 1.55398 12.5269 0.625 9.99991 0.625C6.33514 0.625 3.16468 2.72585 1.62207 5.78977L4.75417 8.21875C5.49139 6.00284 7.55815 4.35369 9.99991 4.35369Z" fill="#EA4335"/>
                </svg>
                <span>Sign up with Kakao</span>
              </button>
            </Form.Item>
            <span className="description" style={{margin: "0rem"}}>or sign up with Email</span>
            <Form.Item
              className="userAccount"
              label={<span className="userTit">Username</span>}
              name="username"
              hasFeedback
              validateStatus={fieldErrors.username ? fieldErrors.username.validateStatus : ''}
              help={fieldErrors.username ? fieldErrors.username.help : ''}
            >
              <Input placeholder="Username" value={signUpUserName} onChange={onUserNameHandler}/>
              <button className="chkBtn" onClick={onClickValidate}>validate check</button>
            </Form.Item>
            <Form.Item
              className="userAccount"
              label={<span className="userTit">Email</span>}
              name="email"
              hasFeedback
              validateStatus={fieldErrors.email ? fieldErrors.email.validateStatus : ''}
              help={fieldErrors.email ? fieldErrors.email.help : ''}
            >
              <Input placeholder="@Email.com" value={signUpEmail} onChange={onEmailHandler}/>
              <button className="chkBtn" onClick={verification}>Verification</button>
            </Form.Item>
            <Form.Item
              className="userAccount"
              name="verify"
              style={{height: "53px"}}
              hasFeedback
            >
              <Input placeholder="Verification Code" value={signUpVerifyCode} onChange={onEmailVerifyCodeHandler} />
              <button className="chkBtn" onClick={emailCheck}>Check</button>
            </Form.Item>
            <Form.Item
              className="userAccount"
              label={<span className="userTit">Password</span>}
              name="password"
              validateStatus={fieldErrors.password ? fieldErrors.password.validateStatus : ''}
              help={fieldErrors.password ? fieldErrors.password.help : ''}
            >
              <Input.Password placeholder="Password" value={signUpPassword} onChange={onPasswordHandler} />
              <Input.Password placeholder="Password Check" value={passwordCheck} onChange={onPwdChkHandler} />
            </Form.Item>
            <Form.Item {...tailLayout} style={{marginBottom: "0px"}}>
              <Button className="accountBtn basic" onClick={onClickSignupBtn} htmlType="submit" style={{ width: '100%' }}>
                Create Account
              </Button>
            </Form.Item>
            <Form.Item className="etcCtn" {...tailLayout}>
              <span className="etc">Already have an account?</span>
              <div className="etcBtn" onClick={() => navigate("/login")}>
                <span>Log in</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 6.85498L11.1741 6.85498" stroke="black" strokeWidth="0.75"/>
                  <path d="M7.64502 3L11.5002 6.85515L7.64502 10.7103" stroke="black" strokeWidth="0.75"/>
                </svg>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
};