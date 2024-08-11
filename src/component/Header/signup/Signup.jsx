import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { axiosInstance } from '../../../common/func/axios';
import "./Signup.css";

export default function Signup() {
  const [form] = Form.useForm();
  const { signUpUserName, setSignUpUserName,
          signUpPassword, setSignUpPassword,
          signUpEmail, setSignUpEmail } = useContext(AppContext);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (type) => {
    const match = {
      google: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/google`,
      kakao: `${process.env.REACT_APP_TOUR_API}/oauth2/authorization/kakao`
    };
    return (window.location.href = match[type]);
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 }
  };

  // 회원 가입
  const onFinish = (values) => {
    try {
      const data = { username: signUpUserName, email: signUpEmail, password: signUpPassword };
      axiosInstance.post("/api/users", data);
      notification.success({ message: '회원 가입 더럽게 힘드네!' });
      navigate("/login");
    } catch (error) {
      notification.error({ message: '회원 가입 실패' });
    }
  };

  // 이름 중복 검증
  const checkUsername = async () => {
    try {
      const data = { username: signUpUserName };
      const response = await axiosInstance.post("/api/users/name/check", data);  

      if (!response.data.isDuplicate) {
        setIsUsernameAvailable(true);
        setIsUsernameValid(true);
        form.setFieldsValue({ username: signUpUserName });
        notification.success({ message: 'Username is available!' });
      } else {
        setIsUsernameAvailable(false);
        notification.error({ message: 'Username is already taken!' });
      }
    } catch (error) {
      notification.error({ message: 'Error checking username!' });
    }
  };

  // 이메일 인증 코드 전송
  const sendVerificationCode = async () => {
    try {
      const data = { email: signUpEmail };
      await axiosInstance.post("/api/users/email/code/send", data);  
      notification.success({ message: 'Verification code sent to your email!' });
      setIsCodeSent(true); 
    } catch (error) {
      notification.error({ message: 'Error sending verification code!' });
    }
  };

  // 이메일 인증 검증 
  const verifyCode = async () => {
    try {
      const data = { email: signUpEmail, code: verificationCode };
      const response = await axiosInstance.post("/api/users/email/code/verify", data);
      console.log(response.data);

      if (response.data.isVerified) {
        notification.success({ message: 'Email Verification Success!' });
        setIsCodeSent(false);
        form.setFieldsValue({ email: signUpEmail });
        form.setFieldsValue({ verificationCode: verificationCode });
        setIsEmailValid(true);
      } else {
        notification.error({ message: 'Invaild verification code!' });
      }
    } catch (error) {
      notification.error({ message: 'Invaild verification code!' });
    }
  };

  return (
    <div className="Account">
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" alt="Logo" />
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
                  <path d="M10 0C4.48 0 0 4.48 0 10c0 4.42 3.1 8.12 7.19 9.41.53.1.73-.23.73-.51v-1.74c-2.91.63-3.52-1.4-3.52-1.4-.48-1.24-1.18-1.57-1.18-1.57-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.42-.28-4.97-1.21-4.97-5.39 0-1.19.42-2.16 1.11-2.93-.11-.28-.48-1.4.1-2.91 0 0 .91-.29 2.98 1.1a10.38 10.38 0 012.72-.36c.92 0 1.83.12 2.72.36 2.07-1.39 2.98-1.1 2.98-1.1.58 1.51.21 2.63.1 2.91.69.77 1.11 1.74 1.11 2.93 0 4.18-2.55 5.11-4.97 5.39.41.35.77 1.02.77 2.06v3.03c0 .28.2.61.73.51C16.9 18.12 20 14.42 20 10c0-5.52-4.48-10-10-10z" fill="#FEE500"/>
                </svg>
                <span>Sign up with Kakao</span>
              </button>
            </Form.Item>
            <span className="description" style={{margin: "0rem"}}>or sign up with Email</span>
          </Form>


          {/* 회원 가입 폼 */}
          <Form form={form} autoComplete="off" onFinish={onFinish} initialValues={{ username: '' }}>
            
            {/* 이름 중복 검증 */}
            <Form.Item
              label="Username"
              name="username"
              {...layout}
              rules={[
                { required: true, message: 'Username is required!' },
                () => ({
                  validator(_, value) {
                    if (isUsernameAvailable === false) {
                      return Promise.reject(new Error('Username is already taken!'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input 
                placeholder="Enter your username" 
                onChange={(e) => setSignUpUserName(e.target.value)} 
                style={{ width: '100%' }}
                autoComplete="new-password"
              />
              {!isUsernameValid && (
                <Button 
                  onClick={checkUsername} 
                  style={{ marginTop: '8px', width: '100%' }}
                >
                  Check Availability
                </Button>
              )}
            </Form.Item>
            
            {/* 이메일 인증 */}
            <Form.Item
              label="Email"
              name="email"
              {...layout}
              rules={[
                { required: true, message: 'Email is required!' }, 
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                placeholder="Enter your email" 
                onChange={(e) => setSignUpEmail(e.target.value)} 
                style={{ width: '100%' }}
                autoComplete="new-password"
              />
              {!isEmailValid && ( 
                <Button 
                  onClick={sendVerificationCode} 
                  style={{ marginTop: '8px', width: '100%' }}
                >
                Send Verification Code
                </Button>
              )}
            </Form.Item>
            <div className={`fade-in ${isCodeSent ? 'fade-in-active' : ''}`}>
            {isCodeSent && ( 
              <>
                <Form.Item
                  label="Verification Code"
                  name="verificationCode"
                  {...layout}
                  rules={[{ required: true, message: 'Verification code is required!' }]}
                >
                  <Input 
                    placeholder="Enter your verification code" 
                    onChange={(e) => setVerificationCode(e.target.value)} 
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Button 
                  onClick={verifyCode} 
                  style={{ marginTop: '8px', width: '100%' }}
                >
                  Verify Code
                </Button>
              </>
            )}
            </div>
            
            {/* 비밀번호 확인 */}
            <Form.Item
              label="Password"
              name="password"
              {...layout}
              rules={[{ required: true, message: 'Password is required!' },
              { min: 6, message: 'Password must be at least 6 characters long!'}]}
            >
              <Input.Password 
                placeholder="Enter your password" 
                onChange={(e) => setSignUpPassword(e.target.value)} 
                style={{ width: '100%' }}
                autoComplete="new-password"
              />
            </Form.Item>
            <div className={`fade-in ${signUpPassword ? 'fade-in-active' : ''}`}>
            {signUpPassword && (
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              {...layout}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                () => ({
                  validator(_, value) {
                    if (!value || value === signUpPassword) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                placeholder="Confirm your password" 
                onChange={(e) => setPasswordCheck(e.target.value)} 
                style={{ width: '100%' }}
              />
            </Form.Item>
            )}
            </div>

            <Form.Item {...tailLayout}>
              <Button className="accountBtn basic" htmlType="submit" style={{ width: "100%", marginTop: '20px' }}>
                Sign Up
              </Button>
            </Form.Item>

          </Form>

        </Card>
      </div>
    </div>
  );
}
