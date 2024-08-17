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
	const [mapStep, setMapStep] = useState(1);
	const [selectLocation, setSelectLocation] = useState("");
	const [selectLocationId, setSelectLocationId] = useState("");
	const [detailInfo, setDetailInfo] = useState(null);
	const [fieldErrors, setFieldErrors] = useState({});

	useEffect(() => {
		console.log(fieldErrors)
	}, [fieldErrors])

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
				mapStep,
				selectLocation,
				selectLocationId,
				detailInfo,
				fieldErrors,

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
				setMapStep,
				setSelectLocation,
				setSelectLocationId,
				setDetailInfo,
				setFieldErrors
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
