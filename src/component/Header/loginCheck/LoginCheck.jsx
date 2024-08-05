import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../common/func/axios';
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from 'antd';
import useLocalStorage from '../../../utils/useLocalStorage';

export default function LoginCheck() {
  const { processLogin } = useLocalStorage();
  const [isFirstLogin, setIsFirstLogin] = useState(null); // useState로 상태 정의
  const navigate = useNavigate(); 

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

  const onFinish = async (values) => {
    const newUsernameRequest = { newUsername: values.username }; // DTO 형태로 객체 생성
    try {
      await axiosInstance.post('/api/auth/names', newUsernameRequest);
      processLogin();
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Failed to submit name:', error);
    }
  };

  return (
    <div>
      {isFirstLogin === true ? (
        <Card title="이름 입력" style={{ width: 300, margin: 'auto', marginTop: '50px' }}>
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '이름을 입력해 주세요!' }]}
            >
              <Input placeholder="이름을 입력하세요" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                제출
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
