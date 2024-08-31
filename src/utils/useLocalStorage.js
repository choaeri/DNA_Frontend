import React, { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popupCheck, setPopupCheck] = useState(false);

  useEffect(() => {
    // 로그인 상태를 로컬 스토리지에서 읽어오기
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');

    // 사용자 팝업 상태를 로컬 스토리지에서 읽어오기
    const popupStatus = localStorage.getItem('popupCheck');
    setPopupCheck(popupStatus === 'true');
  }, []);

  const processLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
  };

  const processLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // 로그아웃 상태 저장
  };

  const processOnPopupCheck = () => {
    setPopupCheck(true);
    localStorage.setItem('popupCheck', 'true'); // 팝업 활성화 상태 저장
  };

  const processOffPopupCheck = () => {
    setPopupCheck(false);
    localStorage.setItem('popupCheck', 'false'); // 팝업 활성화 상태 저장
  };

  return { isLoggedIn, processLogin, processLogout, popupCheck, processOnPopupCheck, processOffPopupCheck };
};

export default useLocalStorage;