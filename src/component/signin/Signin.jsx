import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../common/func/axios";

export default function Signin () {
  const { signInUserName, setSignInUserName,
          signInPassword, setSignInPassword,
          signInEmail, setSignInEmail } = useContext(AppContext);

  const [fieldErrors, setFieldErrors] = useState({});

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

  const onClickSigninBtn = async (e) => {
    setFieldErrors({});
    const data = { username: signInUserName, password: signInPassword, email: signInEmail };

    await axiosInstance.post('api/users', data)
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
      <Card title={<span style={{ color: '#666666' }}>회원가입</span>}>
        <Form
          {...layout}
          onFinish={onClickSigninBtn}
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
            <Input value={signInUserName} onChange={onUserNameHandler}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password value={signInPassword} onChange={onPasswordHandler} />
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
            <Input value={signInEmail} onChange={onEmailHandler}/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" style={{ width: '100%' }}>
              SignIn
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};