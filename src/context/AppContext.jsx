import { createContext, useEffect, useState } from 'react';

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
	const [writeReviewsModal, setWriteReviewsModal] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({});

	const errMessageCheck = () => {

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
				writeReviewsModal,
				fieldErrors,

				errMessageCheck,

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
				setWriteReviewsModal,
				setFieldErrors
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
