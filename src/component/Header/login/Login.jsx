import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../common/func/axios";
import useLocalStorage from '../../../utils/useLocalStorage';

export default function Login() {
  const { processLogin } = useLocalStorage();
  const { loginUserName, setLoginUserName, 
          loginPassword, setLoginPassword,
          fieldErrors, setFieldErrors } = useContext(AppContext);

  const navigate = useNavigate();

  const successLogin = <SmileOutlined style={{ color: "#108ee9" }} />;
  const failLogin = <FrownOutlined style={{ color: "#ff3333" }} />;

  const onUserNameHandler = (e) => {
    setLoginUserName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleLogin = (type) => {
    const match = {
      google: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/google`,
      kakao: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/kakao`,
    };
    return (window.location.href = match[type]);
  };

  const onClickLoginBtn = () => {
    setFieldErrors({});
    const data = { username: loginUserName, password: loginPassword };

    axiosInstance.post("/api/auth/login", data)
      .then((res) => {
        notification.open({
          message: "로그인 완료",
          icon: successLogin,
        });
        processLogin();
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          const {
            data: { errorMessage },
          } = error.response;

          notification.open({
            message: "로그인 실패",
            description: "올바른 정보를 입력해주세요!",
            icon: failLogin,
          });

          let newFieldErrors;
          if (errorMessage) {
            newFieldErrors = {
              username: {
                validateStatus: "error",
                help: "Please input your username!",
              },
              password: {
                validateStatus: "error",
                help: "Please input your password!",
              }
            };
            setFieldErrors(newFieldErrors);
          }
        }
      });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: { offset: 11 },
  };

  return (
    <div className="Account">
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" />
        <Card className="accountCnt" title={<span className="tit">Log in</span>}>
          <Form {...layout} initialValues={{ username: loginUserName, password: loginPassword }}>
            <Form.Item {...tailLayout}>
              <button className="accountBtn google" value="google" onClick={() => handleLogin("google")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 10.2125C19 9.54776 18.9403 8.90856 18.8295 8.29492H10V11.9213H15.0455C14.8281 13.0932 14.1676 14.0861 13.1747 14.7509V17.1032H16.2045C17.9773 15.4711 19 13.0676 19 10.2125Z" fill="#4285F4"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 19.375C12.5312 19.375 14.6533 18.5355 16.2045 17.1037L13.1746 14.7514C12.3351 15.3139 11.2613 15.6463 9.99991 15.6463C7.55815 15.6463 5.49139 13.9972 4.75417 11.7812H1.62207V14.2102C3.16468 17.2741 6.33514 19.375 9.99991 19.375Z" fill="#34A853"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.75426 11.781C4.56676 11.2185 4.46023 10.6177 4.46023 9.99978C4.46023 9.38188 4.56676 8.78103 4.75426 8.21853V5.78955H1.62216C0.987216 7.05518 0.625 8.48699 0.625 9.99978C0.625 11.5126 0.987216 12.9444 1.62216 14.21L4.75426 11.781Z" fill="#FBBC05"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.99991 4.35369C11.3763 4.35369 12.6121 4.8267 13.5837 5.75568L16.2726 3.06676C14.6491 1.55398 12.5269 0.625 9.99991 0.625C6.33514 0.625 3.16468 2.72585 1.62207 5.78977L4.75417 8.21875C5.49139 6.00284 7.55815 4.35369 9.99991 4.35369Z" fill="#EA4335"/>
                </svg>
                <span>Log In with Google</span>
              </button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <button className="accountBtn google" onClick={() => handleLogin("kakao")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                 <path d="M10 0C4.48 0 0 4.48 0 10c0 4.42 3.1 8.12 7.19 9.41.53.1.73-.23.73-.51v-1.74c-2.91.63-3.52-1.4-3.52-1.4-.48-1.24-1.18-1.57-1.18-1.57-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.42-.28-4.97-1.21-4.97-5.39 0-1.19.42-2.16 1.11-2.93-.11-.28-.48-1.4.1-2.91 0 0 .91-.29 2.98 1.1a10.38 10.38 0 012.72-.36c.92 0 1.83.12 2.72.36 2.07-1.39 2.98-1.1 2.98-1.1.58 1.51.21 2.63.1 2.91.69.77 1.11 1.74 1.11 2.93 0 4.18-2.55 5.11-4.97 5.39.41.35.77 1.02.77 2.06v3.03c0 .28.2.61.73.51C16.9 18.12 20 14.42 20 10c0-5.52-4.48-10-10-10z" fill="#FEE500"/>
                </svg>
                <span>Sign up with Kakao</span>
              </button>
            </Form.Item>
            <span className="description">or Log in with Username</span>
            <Form.Item
              className="userAccount"
              label={<span className="userTit">Username</span>}
              name="name"
              hasFeedback
              validateStatus={fieldErrors.username ? fieldErrors.username.validateStatus : ''}
              help={fieldErrors.username ? fieldErrors.username.help : ''}
            >
              <Input placeholder="Username" value={loginUserName} onChange={onUserNameHandler} autoComplete="new-password"/>
            </Form.Item>
            <Form.Item
              className="userAccount"
              label={<span className="userTit">Password</span>}
              name="password"
              validateStatus={fieldErrors.password ? fieldErrors.password.validateStatus : ''}
              help={fieldErrors.password ? fieldErrors.password.help : ''}
            >
              <Input.Password placeholder="Password" value={loginPassword} onChange={onPasswordHandler} autoComplete="new-password"/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className="accountBtn basic" onClick={onClickLoginBtn} htmlType="submit" style={{ width: "100%" }}>
                <span>Log in</span>
              </Button>
            </Form.Item>
            <Form.Item className="etcCtn" {...tailLayout}>
              <div className="etcBtn">
                <span>Forgot</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 6.85498L11.1741 6.85498" stroke="black" strokeWidth="0.75"/>
                  <path d="M7.64502 3L11.5002 6.85515L7.64502 10.7103" stroke="black" strokeWidth="0.75"/>
                </svg>
              </div>
            </Form.Item>
            <Form.Item className="etcCtn" {...tailLayout}>
              <span className="etc">Don’t have an account?</span>
              <div className="etcBtn" onClick={() => navigate("/signup")}>
                <span>Sign up</span>
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
  );
}