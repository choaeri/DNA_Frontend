import { createContext, useState } from 'react';

const AppContext = createContext({
	
});

const AppProvider = ({ children }) => {
	const [openLoginPage, setOpenLoginPage] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [loginUserName, setLoginUserName] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signUpUserName, setSignUpUserName] = useState("");
	const [signUpId, setSignUpId] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
  const [locations, setLocations] = useState([]);
	const [viewMode, setViewMode] = useState('list');

	return (
		<AppContext.Provider
			value={{
				openLoginPage,
				isLogin,
				loginUserName,
				loginPassword,
				signUpUserName,
				signUpId,
				signUpPassword,
				signUpEmail,
				locations,
				viewMode,

				setOpenLoginPage,
				setIsLogin,
				setLoginUserName,
				setLoginPassword,
				setSignUpUserName,
				setSignUpId,
				setSignUpPassword,
				setSignUpEmail,
				setLocations,
				setViewMode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
