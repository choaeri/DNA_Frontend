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
      await axiosInstance.patch('/api/auth/names', newUsernameRequest);
      processLogin();
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Failed to submit name:', error);
    }
  };

  return (
    <div>
      {isFirstLogin === true ? (
        <Card className='loginChkCnt' title={<span className="userTit">Username</span>} style={{ width: 300, margin: 'auto', marginTop: '50px' }}>
          <Form>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '이름을 입력해 주세요!' }]}
            >
              <Input placeholder="Username" onChange={onUserNameHandler} />
            </Form.Item>
            <Form.Item>
              <Button className='chkBtn' type="primary" htmlType="submit" onClick={onClickLoginCheck}>
                <span>Log in</span>
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <p></p> 
      )}
    </div>
  );
}
