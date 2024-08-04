import React, { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태를 로컬 스토리지에서 읽어오기
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const processLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
  };

  const processLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // 로그아웃 상태 저장
  };

  return { isLoggedIn, processLogin, processLogout };
};

export default useLocalStorage;