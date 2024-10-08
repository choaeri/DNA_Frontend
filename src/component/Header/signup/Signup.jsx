import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { axiosInstance } from "../../../common/func/axios";
import "./Signup.css";

export default function Signup() {
  const {
    signUpUserName,
    setSignUpUserName,
    signUpPassword,
    setSignUpPassword,
    signUpEmail,
    setSignUpEmail,
    errMessageCheck,
  } = useContext(AppContext);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAuthenticatedEmail, setIsAuthenticatedEmail] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (type) => {
    const match = {
      google: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/google`,
      kakao: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/kakao`,
    };
    return (window.location.href = match[type]);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 11 },
  };

  // 회원 가입
  const onFinish = (values) => {
    try {
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      axiosInstance.post("/api/public/users", data);
      notification.success({ message: "Success Signup" });
      navigate("/login");
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: "Failed Signup" });
    }
  };

  // 이름 중복 검증
  const checkUsername = async () => {
    try {
      const data = { username: signUpUserName };
      const response = await axiosInstance.post(
        "/api/public/users/name/check",
        data
      );

      if (!response.data.isDuplicate) {
        setIsUsernameAvailable(true);
        setIsUsernameValid(true);
        notification.success({ message: "Username is available!" });
      } else {
        setIsUsernameAvailable(false);
        notification.error({ message: "Username is already taken!" });
      }
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: "Error checking username!" });
    }
  };

  // 이메일 인증 코드 전송
  const sendVerificationCode = async () => {
    try {
      const data = { email: signUpEmail };
      await axiosInstance.post("/api/public/users/email/code/send", data);
      notification.success({
        message: "Verification code sent to your email!",
      });
      setIsCodeSent(true);
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: "Error sending verification code!" });
    }
  };

  // 이메일 인증 검증
  const verifyCode = async () => {
    try {
      const data = { email: signUpEmail, code: verificationCode };
      const response = await axiosInstance.post(
        "/api/public/users/email/code/verify",
        data
      );

      if (response.data.isVerified) {
        notification.success({ message: "Email Verification Success!" });
        setIsCodeSent(false);
        setIsEmailValid(true);
        setIsAuthenticatedEmail(true);
      } else {
        notification.error({ message: "Invalid verification code!" });
      }
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: "Invalid verification code!" });
    }
  };

  return (
    <div className="Account">
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" />
        <Card
          className="accountCnt"
          title={<span className="tit">Sign Up</span>}
        >
          <Form {...layout} autoComplete="off" onFinish={onFinish}>
            <Form.Item {...tailLayout}>
              <button
                className="accountBtn google"
                onClick={() => handleSignup("google")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 10.2125C19 9.54776 18.9403 8.90856 18.8295 8.29492H10V11.9213H15.0455C14.8281 13.0932 14.1676 14.0861 13.1747 14.7509V17.1032H16.2045C17.9773 15.4711 19 13.0676 19 10.2125Z"
                    fill="#4285F4"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99991 19.375C12.5312 19.375 14.6533 18.5355 16.2045 17.1037L13.1746 14.7514C12.3351 15.3139 11.2613 15.6463 9.99991 15.6463C7.55815 15.6463 5.49139 13.9972 4.75417 11.7812H1.62207V14.2102C3.16468 17.2741 6.33514 19.375 9.99991 19.375Z"
                    fill="#34A853"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.75426 11.781C4.56676 11.2185 4.46023 10.6177 4.46023 9.99978C4.46023 9.38188 4.56676 8.78103 4.75426 8.21853V5.78955H1.62216C0.987216 7.05518 0.625 8.48699 0.625 9.99978C0.625 11.5126 0.987216 12.9444 1.62216 14.21L4.75426 11.781Z"
                    fill="#FBBC05"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99991 4.35369C11.3763 4.35369 12.6121 4.8267 13.5837 5.75568L16.2726 3.06676C14.6491 1.55398 12.5269 0.625 9.99991 0.625C6.33514 0.625 3.16468 2.72585 1.62207 5.78977L4.75417 8.21875C5.49139 6.00284 7.55815 4.35369 9.99991 4.35369Z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <button
                className="accountBtn kakao"
                onClick={() => handleSignup("kakao")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.9795 2C5.01822 2 1 5.15718 1 9.09339C1 11.5945 2.68109 13.8087 5.18223 15.0797L4.32118 18.2779C4.28018 18.3599 4.32118 18.4829 4.40319 18.5649C4.44419 18.6059 4.5262 18.6469 4.5672 18.6469C4.6082 18.6469 4.6902 18.6059 4.73121 18.6059L8.38041 16.1458C8.91344 16.2278 9.44647 16.2688 10.0205 16.2688C14.9818 16.2688 19 13.0706 19 9.1754C19 5.15718 14.9818 2 9.9795 2Z"
                    fill="black"
                  />
                </svg>
                <span>Sign up with Kakao</span>
              </button>
            </Form.Item>
            <span className="description">or sign up with Email</span>

            {/* 이름 중복 검증 */}
            <Form.Item
              className="userAccount"
              hasFeedback
              label={<span className="userTit">Username</span>}
              name="username"
              {...layout}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.trim() === "") {
                      return Promise.reject(new Error("Username is required!"));
                    }
                    if (isUsernameAvailable === false) {
                      return Promise.reject(
                        new Error("Username is already taken!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                placeholder="Enter your username"
                onChange={(e) => setSignUpUserName(e.target.value)}
              />
            </Form.Item>

            <div
              className={`fade-in ${
                signUpUserName && !isUsernameValid ? "fade-in-active" : ""
              }`}
            >
              {signUpUserName && !isUsernameValid && (
                <Button
                  onClick={checkUsername}
                  style={{
                    marginTop: "-10px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  Check Availability
                </Button>
              )}
            </div>

            {/* 이메일 인증 */}
            <Form.Item
              className="userAccount"
              hasFeedback
              label={<span className="userTit">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                onChange={(e) => {
                  setSignUpEmail(e.target.value);
                  const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;
                  setIsEmailValid(emailPattern.test(e.target.value));
                }}
                autoComplete="new-password"
              />
            </Form.Item>

            <div
              className={`fade-in ${
                signUpEmail && isEmailValid && !isAuthenticatedEmail
                  ? "fade-in-active"
                  : ""
              }`}
            >
              {signUpEmail && isEmailValid && !isAuthenticatedEmail && (
                <Button
                  onClick={sendVerificationCode}
                  style={{
                    marginTop: "-10px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  Send Verification Code
                </Button>
              )}
            </div>

            <div className={`fade-in ${isCodeSent ? "fade-in-active" : ""}`}>
              {isCodeSent && (
                <>
                  <Form.Item
                    className="userAccount"
                    hasFeedback
                    label={<span className="userTit">Verification Code</span>}
                    name="verificationCode"
                    labelCol={{ span: 30 }}
                    rules={[
                      {
                        required: true,
                        message: "Verification code is required!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your verification code"
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    onClick={verifyCode}
                    style={{
                      marginTop: "-10px",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    Verify Code
                  </Button>
                </>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <Form.Item
              className="userAccount"
              hasFeedback
              label={<span className="userTit">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                onChange={(e) => setSignUpPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Item>
            <div
              className={`fade-in ${signUpPassword ? "fade-in-active" : ""}`}
            >
              {signUpPassword && (
                <Form.Item
                  className="userAccount"
                  hasFeedback
                  label={<span className="userTit">Confirm Password</span>}
                  labelCol={{ span: 30 }}
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm your password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                </Form.Item>
              )}
            </div>

            <Form.Item {...tailLayout}>
              <Button
                htmlType="submit"
                className="accountBtn basic"
                style={{ marginTop: "7px" }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
