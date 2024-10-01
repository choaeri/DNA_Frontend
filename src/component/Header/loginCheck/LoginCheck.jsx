import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../common/func/axios";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import useLocalStorage from "../../../utils/useLocalStorage";
import "./LoginCheck.css";
import { AppContext } from "../../../context/AppContext";

export default function LoginCheck() {
  const { signUpUserName, setSignUpUserName, popupCheck, errMessageCheck } =
    useContext(AppContext);
  const [isFirstLogin, setIsFirstLogin] = useState(null); // useState로 상태 정의
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const { processLogin } = useLocalStorage();
  const [form] = Form.useForm();

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchFirstLogin = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/auth/first-social-login"
        );
        setIsFirstLogin(response.data.isFirstLogin);
      } catch (error) {
        errMessageCheck(error.response.data.errorMessage);
      }
    };
    fetchFirstLogin();
  }, []);

  useEffect(() => {
    if (isFirstLogin === false) {
      processLogin();
      popupCheck();
    }
  }, [isFirstLogin, navigate]);

  const onClickLoginCheck = async () => {
    // 사용자 이름이 유효한지 확인
    if (!isUsernameAvailable || !isUsernameValid) {
      notification.error({
        message: "Invalid Username.",
      });
      return;
    }

    const newUsernameRequest = { newUsername: signUpUserName };
    try {
      await axiosInstance.patch("/api/auth/name", newUsernameRequest);
      notification.success({ message: "Success Signup" });
      processLogin();
      popupCheck();
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: "Failed Signup" });
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 11 },
  };

  return (
    <div className="Account">
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" />
        {isFirstLogin === true ? (
          <Card
            className="accountCnt"
            title={<span className="tit">Sign Up</span>}
          >
            <Form {...layout} form={form}>
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
                        return Promise.reject(
                          new Error("Username is required!")
                        );
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

              <Form.Item>
                <Button
                  className="accountBtn basic"
                  type="primary"
                  htmlType="submit"
                  onClick={onClickLoginCheck}
                  style={{ marginTop: "7px" }}
                >
                  <span>Input Username</span>
                </Button>
              </Form.Item>

              <Form.Item className="etcCtn" {...tailLayout}>
                <span className="etc">Already have an account?</span>
                <div className="etcBtn" onClick={() => navigate("/login")}>
                  <span>Log in</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2.5 6.85498L11.1741 6.85498"
                      stroke="black"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M7.64502 3L11.5002 6.85515L7.64502 10.7103"
                      stroke="black"
                      strokeWidth="0.75"
                    />
                  </svg>
                </div>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
