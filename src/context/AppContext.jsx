import { createContext, useState } from 'react';

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
  const [selectLocation, setSelectLocation] = useState();

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
				setSelectLocation
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
