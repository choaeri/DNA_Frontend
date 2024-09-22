import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { axiosInstance } from '../common/func/axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
	const [openLoginPage, setOpenLoginPage] = useState(false);

	const [loginUserName, setLoginUserName] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const [signUpUserName, setSignUpUserName] = useState('');
	const [signUpId, setSignUpId] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpVerifyCode, setSignUpVerifyCode] = useState('');

	const [locations, setLocations] = useState([]);
	const [viewMode, setViewMode] = useState('list');
	const [selectLocationName, setSelectLocationName] = useState('');
	const [detailInfo, setDetailInfo] = useState(null);
	const [isBookmarked, setIsBookmarked] = useState({});
	const [isBookmarkedOffice, setIsBookmarkedOffice] = useState({});
	const [schedules, setSchedules] = useState([]);
	const [disabled, setDisabled] = useState(false);

	const [markers, setMarkers] = useState(null);
	const [info, setInfo] = useState(null);

	const [isPopup, setIsPopup] = useState(false);
	const [isLoginPopup, setIsLoginPopup] = useState(false);

	const [openReviewModal, setOpenReviewModal] = useState(false);
	const [writeReviewsModal, setWriteReviewsModal] = useState(false);
	const [workationModal, setWorkationModal] = useState(false);

	const [fieldErrors, setFieldErrors] = useState({});

	const { processLogout, processOnPopupCheck } = useLocalStorage();

	const navigate = useNavigate();

	const errMessageCheck = (errorMessage) => {
		if (errorMessage === 'Expired token.') {
			setIsLoginPopup(true);
			processLogout();
		}
	};

	const onClickLike = async (e, facilityId, type) => {
		console.log(type);
		const currentIsBookmarked = isBookmarked[facilityId];
		let apiUrl;
		if (type == 'Workation Office') {
			apiUrl = `/api/workation-offices/${facilityId}/bookmark`;
		} else {
			apiUrl = `/api/facilities/${facilityId}/bookmark`;
		}
		const method = isBookmarked[facilityId] ? 'DELETE' : 'POST';
		try {
			setIsBookmarked((prev) => ({
				...prev,
				[facilityId]: !currentIsBookmarked,
			}));
			await axiosInstance({
				url: apiUrl,
				method,
			});
		} catch (error) {
			setIsBookmarked((prev) => ({
				...prev,
				[facilityId]: currentIsBookmarked, // 원래 상태로 되돌리기
			}));
			errMessageCheck(error.response.data.errorMessage);
			console.log(error);
		}
	};

	const popupCheck = () => {
		// 사용자 팝업 상태 조회 API 호출
		const fetchPopup = async () => {
			try {
				const res = await axiosInstance.get('/api/users/popup-status');
				const data = res.data;
				if (data.popupStatus === 'review-writing') {
					processOnPopupCheck();
				}
				navigate('/');
			} catch (err) {
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
				schedules,
				disabled,

				markers,
				info,

				isPopup,
				isLoginPopup,

				openReviewModal,
				workationModal,
				writeReviewsModal,

				fieldErrors,

				errMessageCheck,
				popupCheck,
				onClickLike,

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
				setSchedules,
				setDisabled,

				setMarkers,
				setInfo,

				setIsPopup,
				setIsLoginPopup,

				setOpenReviewModal,
				setWorkationModal,
				setWriteReviewsModal,

				setFieldErrors,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
