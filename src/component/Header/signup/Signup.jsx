import { useContext, useState } from "react"
import { AppContext } from "../../../context/AppContext"
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../common/func/axios";

export default function Signup () {
  const { signUpUserName, setSignUpUserName,
          signUpPassword, setSignUpPassword,
          signUpEmail, setSignUpEmail } = useContext(AppContext);

  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const onUserNameHandler = (e) => {
    setSignUpUserName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setSignUpPassword(e.target.value);
  };

  const onEmailHandler = (e) => {
    setSignUpEmail(e.target.value);
  };

  const onClickSignupBtn = async (e) => {
    setFieldErrors({});
    const data = { username: signUpUserName, password: signUpPassword, email: signUpEmail };

    await axiosInstance.post('/api/users', data)
    .then((res) => {
      notification.open({
        message: "회원가입 완료",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />
      });
      navigate("/login");
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
      }

      setFieldErrors((prevErrors) => {
        const updatedErrors = {};
  
        for (const [fieldName, errors] of Object.entries(prevErrors)) {
          const errorMessage = errors instanceof Array ? errors.join(" ") : errors;
          updatedErrors[fieldName] = {
            validateStatus: "error",
            help: errorMessage,
          };
        };
  
        return {
          ...prevErrors,
          ...updatedErrors,
        };
      });
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10}
  };
    
  const tailLayout = {
    wrapperCol: { offset: 11}
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      <Card title={<span style={{ color: '#666666' }}>Sign Up</span>}>
        <Form
          {...layout}
          onFinish={onClickSignupBtn}
          autoComplete={"false"}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
            hasFeedback
            {...fieldErrors.username}
            {...fieldErrors.non_field_errors}
          >
            <Input value={signUpUserName} onChange={onUserNameHandler}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password value={signUpPassword} onChange={onPasswordHandler} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
            hasFeedback
            {...fieldErrors.email}
            {...fieldErrors.non_field_errors}
          >
            <Input value={signUpEmail} onChange={onEmailHandler}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};