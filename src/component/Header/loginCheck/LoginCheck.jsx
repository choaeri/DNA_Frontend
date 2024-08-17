import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../common/func/axios';
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from 'antd';
import useLocalStorage from '../../../utils/useLocalStorage';
import "./LoginCheck.css";

export default function LoginCheck() {
  const { processLogin } = useLocalStorage();
  const [isFirstLogin, setIsFirstLogin] = useState(null); // useState로 상태 정의
  const [userName, setUserName] = useState('');

  const navigate = useNavigate(); 

  const onUserNameHandler = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    const fetchFirstLogin = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/login/check');
        setIsFirstLogin(response.data.isFirstLogin);
      } catch (error) {
        console.error('Failed to fetch isFirstLogin:', error);
      }
    };
    fetchFirstLogin();
  }, []);

  useEffect(() => {
    if (isFirstLogin === false) {
      processLogin();
      navigate('/'); 
    }
  }, [isFirstLogin, navigate]);

  const onClickLoginCheck = async () => {
    const newUsernameRequest = { newUsername: userName }; // DTO 형태로 객체 생성
    try {
      await axiosInstance.patch('/api/auth/name', newUsernameRequest);
      processLogin();
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Failed to submit name:', error);
    }
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 }
  };

  return (
    <div className='Account'>
      <div className="header"></div>
      <div className="content">
        <img src="/img/DNALogin.png" alt="Logo" />
        {isFirstLogin === true ? (
          <Card className="accountCnt signup" title={<span className="tit">Sign Up</span>}>
            <Form {...layout}>
              <Form.Item
                label="Username"
                name="username"
                {...layout}
                rules={[{ required: true, message: '이름을 입력해 주세요!' }]}
              >
                <Input placeholder="Username" onChange={onUserNameHandler} />
              </Form.Item>
              <Form.Item>
                <Button className="accountBtn basic" type="primary" htmlType="submit" onClick={onClickLoginCheck} style={{ width: "100%", marginTop: '20px' }}>
                  <span>Create Account</span>
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
        ) : (
          <p></p> 
        )}
      </div>
    </div>
  );
}
