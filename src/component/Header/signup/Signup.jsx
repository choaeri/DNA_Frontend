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
      facebook: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/facebook`,
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
      await axiosInstance.post("/api/users/names/validate", data) 
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
      await axiosInstance.post("/api/users/emails/code", data)
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
      await axiosInstance.post("/api/users/emails/verify", data)
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
              <button className="accountBtn isg" onClick={() => handleSignup("instagram")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13.75 1.875H6.25C5.09006 1.87624 3.97798 2.33758 3.15778 3.15778C2.33758 3.97798 1.87624 5.09006 1.875 6.25V13.75C1.87624 14.9099 2.33758 16.022 3.15778 16.8422C3.97798 17.6624 5.09006 18.1238 6.25 18.125H13.75C14.9099 18.1238 16.022 17.6624 16.8422 16.8422C17.6624 16.022 18.1238 14.9099 18.125 13.75V6.25C18.1238 5.09006 17.6624 3.97798 16.8422 3.15778C16.022 2.33758 14.9099 1.87624 13.75 1.875ZM10 13.75C9.25832 13.75 8.5333 13.5301 7.91661 13.118C7.29993 12.706 6.81928 12.1203 6.53545 11.4351C6.25162 10.7498 6.17736 9.99584 6.32206 9.26841C6.46675 8.54098 6.8239 7.8728 7.34835 7.34835C7.8728 6.8239 8.54098 6.46675 9.26841 6.32206C9.99584 6.17736 10.7498 6.25162 11.4351 6.53545C12.1203 6.81928 12.706 7.29993 13.118 7.91661C13.5301 8.5333 13.75 9.25832 13.75 10C13.749 10.9942 13.3535 11.9475 12.6505 12.6505C11.9475 13.3535 10.9942 13.749 10 13.75ZM14.6875 6.25C14.5021 6.25 14.3208 6.19502 14.1667 6.092C14.0125 5.98899 13.8923 5.84257 13.8214 5.67127C13.7504 5.49996 13.7318 5.31146 13.768 5.1296C13.8042 4.94775 13.8935 4.7807 14.0246 4.64959C14.1557 4.51848 14.3227 4.42919 14.5046 4.39301C14.6865 4.35684 14.875 4.37541 15.0463 4.44636C15.2176 4.51732 15.364 4.63748 15.467 4.79165C15.57 4.94582 15.625 5.12708 15.625 5.3125C15.625 5.56114 15.5262 5.7996 15.3504 5.97541C15.1746 6.15123 14.9361 6.25 14.6875 6.25ZM12.5 10C12.5 10.4945 12.3534 10.9778 12.0787 11.3889C11.804 11.8 11.4135 12.1205 10.9567 12.3097C10.4999 12.4989 9.99723 12.5484 9.51227 12.452C9.02732 12.3555 8.58186 12.1174 8.23223 11.7678C7.8826 11.4181 7.6445 10.9727 7.54804 10.4877C7.45157 10.0028 7.50108 9.50011 7.6903 9.04329C7.87952 8.58648 8.19995 8.19603 8.61107 7.92133C9.0222 7.64662 9.50555 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" fill="white"/>
                </svg>
                <span>Sign up with Instagram</span>
              </button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <button className="accountBtn fb" onClick={() => handleSignup("facebook")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_338_5963)">
                    <path d="M20 9.97585C20 4.46634 15.5229 0 10 0C4.47715 0 0 4.46634 0 9.97585C0 14.9551 3.65685 19.0821 8.4375 19.8305V12.8595H5.89844V9.97585H8.4375V7.77805C8.4375 5.27784 9.93043 3.89682 12.2146 3.89682C13.3087 3.89682 14.4531 4.09166 14.4531 4.09166V6.54665H13.1922C11.9499 6.54665 11.5625 7.31563 11.5625 8.10455V9.97585H14.3359L13.8926 12.8595H11.5625V19.8305C16.3431 19.0821 20 14.9551 20 9.97585Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_338_5963">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span>Sign up with FaceBook</span>
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