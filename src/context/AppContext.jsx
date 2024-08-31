import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { axiosInstance } from '../common/func/axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({
	
});

const AppProvider = ({ children }) => {
	const [openLoginPage, setOpenLoginPage] = useState(false);
	const [loginUserName, setLoginUserName] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signUpUserName, setSignUpUserName] = useState("");
	const [signUpId, setSignUpId] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpVerifyCode, setSignUpVerifyCode] = useState("");
	const [locations, setLocations] = useState([]);
	const [viewMode, setViewMode] = useState('list');
	const [selectLocationName, setSelectLocationName] = useState("");
	const [detailInfo, setDetailInfo] = useState(null);
	const [isBookmarked, setIsBookmarked] = useState();
	const [openReviewModal, setOpenReviewModal] = useState(false);
	const [isPopup, setIsPopup] = useState();
	const [isLoginPopup, setIsLoginPopup] = useState(false);
	const [writeReviewsModal, setWriteReviewsModal] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({});

  const { processLogout, processOnPopupCheck } = useLocalStorage();

  const navigate = useNavigate();

	const errMessageCheck = (errorMessage) => {
		if(errorMessage === "만료된 토큰입니다. 다시 로그인해주세요.") {
			setIsLoginPopup(true);
			processLogout();
		}
	};

	const popupCheck = () => {
		// 사용자 팝업 상태 조회 API 호출
		const fetchPopup = async () => {
			try {
				const res = await axiosInstance.get("/api/users/popup-status");
				const data = res.data;
				if(data.popupStatus === "review-writing") {
					processOnPopupCheck();
				};
				navigate("/");
			} catch(err) {
				errMessageCheck(err.response.data.errorMessage);
				console.log(err);
			}
		};
		fetchPopup();
	};

	return (
		<AppContext.Provider
			value={{
				openLoginPage,
				loginUserName,
				loginPassword,
				signUpUserName,
				signUpId,
				signUpPassword,
				signUpEmail,
				signUpVerifyCode,
				locations,
				viewMode,
				selectLocationName,
				detailInfo,
				isBookmarked,
				openReviewModal,
				isPopup,
				isLoginPopup,
				writeReviewsModal,
				fieldErrors,

				errMessageCheck,
				popupCheck,

				setOpenLoginPage,
				setLoginUserName,
				setLoginPassword,
				setSignUpUserName,
				setSignUpId,
				setSignUpPassword,
				setSignUpEmail,
				setSignUpVerifyCode,
				setLocations,
				setViewMode,
				setSelectLocationName,
				setDetailInfo,
				setIsBookmarked,
				setOpenReviewModal,
				setIsPopup,
				setIsLoginPopup,
				setWriteReviewsModal,
				setFieldErrors
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
