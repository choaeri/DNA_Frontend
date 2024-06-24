import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import axios from "axios";
import Home from "../Home";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../common/func/axios";

export default function Login () {
  const { loginUserName, setLoginUserName,
          loginPassword, setLoginPassword } = useContext(AppContext);

  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const successLogin = <SmileOutlined style={{ color: "#108ee9" }} />;
  const failLogin = <FrownOutlined style={{ color: "#ff3333" }} />;

  const onUserNameHandler = (e) => {
    setLoginUserName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const match = {
      'naver': `https://dna-kangwon.site/oauth2/authorization/naver`,
      'kakao': `https://dna-kangwon.site/oauth2/authorization/kakao`,
      'google': `https://dna-kangwon.site/oauth2/authorization/google`,
      'facebook': `https://dna-kangwon.site/oauth2/authorization/facebook`
    };
    return window.location.href = match[value];
  };

  const onClickLoginBtn = async (e) => {
    setFieldErrors({});
    const data = { username: loginUserName, password: loginPassword };

    await axiosInstance.post('api/auth/login', data)
    .then((res) => {
      console.log(res);
      notification.open({
        message: "로그인 완료",
        icon: successLogin
      });
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      notification.open({
        message: `${err} 에러`,
        description: err,
        icon: failLogin
      });

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
    <div className="Login" style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      <Card title={<span style={{ color: '#666666' }}>로그인</span>}>
        <Form
          {...layout}
          onFinish={onClickLoginBtn}
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
            <Input value={loginUserName} onChange={onUserNameHandler}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password value={loginPassword} onChange={onPasswordHandler} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button style={{ width: '100%' }}>
              <a href="/signin">Signup</a>
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <button value='naver' onClick={handleLogin} style={{ width: '100%' }}>
              Naver Login
            </button>
          </Form.Item>   
          <Form.Item {...tailLayout}>
            <button value='kakao' onClick={handleLogin} style={{ width: '100%' }}>
              Kakao Login
            </button>
          </Form.Item>  
          <Form.Item {...tailLayout}>
            <button value='google' onClick={handleLogin} style={{ width: '100%' }}>
              Google Login
            </button>
          </Form.Item> 
          <Form.Item {...tailLayout}>
            <button value='facebook' onClick={handleLogin} style={{ width: '100%' }}>
              FaceBook Login
            </button>
          </Form.Item> 
        </Form>
      </Card>
    </div>
  )
};