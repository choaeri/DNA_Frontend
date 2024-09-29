import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../../../common/func/axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, notification } from 'antd';
import useLocalStorage from '../../../utils/useLocalStorage';
import './LoginCheck.css';
import { AppContext } from '../../../context/AppContext';

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
				'/api/public/users/name/check',
				data
			);

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
			errMessageCheck(error.response.data.errorMessage);
			notification.error({ message: 'Error checking username!' });
		}
	};

	useEffect(() => {
		const fetchFirstLogin = async () => {
			try {
				const response = await axiosInstance.get(
					'/api/auth/first-social-login'
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
		const newUsernameRequest = { newUsername: signUpUserName }; // DTO 형태로 객체 생성
		try {
			await axiosInstance.patch('/api/auth/name', newUsernameRequest);
			notification.success({ message: 'Success Signup' });
      processLogin();
			popupCheck();
		} catch (error) {
			errMessageCheck(error.response.data.errorMessage);
      notification.error({ message: 'Failed Signup' });
		}
	};

	const layout = {
		labelCol: { span: 24 },
		wrapperCol: { span: 24 },
	};

	const tailLayout = {
		wrapperCol: { offset: 0, span: 24 },
	};

	return (
		<div className="Account">
			<div className="header"></div>
			<div className="content">
				<img src="/img/DNALogin.png" alt="Logo" />
				{isFirstLogin === true ? (
					<Card
						className="accountCnt signup"
						title={<span className="tit">Sign Up</span>}
					>
						<Form {...layout} form={form}>
							<Form.Item
								label="Username"
								name="username"
								{...layout}
								rules={[
									{ required: true, message: 'Username is required!' },
									() => ({
										validator(_, value) {
											if (isUsernameAvailable === false) {
												return Promise.reject(
													new Error('Username is already taken!')
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
									style={{ width: '100%' }}
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
							<Form.Item>
								<Button
									className="accountBtn basic"
									type="primary"
									htmlType="submit"
									onClick={onClickLoginCheck}
									style={{ width: '100%', marginTop: '20px' }}
								>
									<span>Create Account</span>
								</Button>
							</Form.Item>
							<Form.Item className="etcCtn" {...tailLayout}>
								<span className="etc">Already have an account?</span>
								<div className="etcBtn" onClick={() => navigate('/login')}>
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
