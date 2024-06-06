import { createContext, useState } from 'react';

const AppContext = createContext({
	
});

const AppProvider = ({ children }) => {
	const [openLoginPage, setOpenLoginPage] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [loginId, setLoginId] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signInUserName, setSignInUserName] = useState("");
	const [signInId, setSignInId] = useState("");
	const [signInPassword, setSignInPassword] = useState("");
	const [signInEmail, setSignInEmail] = useState("");

	return (
		<AppContext.Provider
			value={{
				openLoginPage,
				isLogin,
				loginId,
				loginPassword,
				signInUserName,
				signInId,
				signInPassword,
				signInEmail,

				setOpenLoginPage,
				setIsLogin,
				setLoginId,
				setLoginPassword,
				setSignInUserName,
				setSignInId,
				setSignInPassword,
				setSignInEmail
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
