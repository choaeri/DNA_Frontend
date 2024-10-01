import { createContext, useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { axiosInstance } from "../common/func/axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext({});

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
  const [location, setLocation] = useState({
    beach: [],
    mount: [],
    culture: [],
  });
  const [facilityCount, setFacilityCount] = useState();
  const [viewMode, setViewMode] = useState("list");
  const [selectLocationName, setSelectLocationName] = useState("");
  const [detailInfo, setDetailInfo] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState({});
  const [isWorkationBookmarked, setIsWorkationBookmarked] = useState();
  const [schedules, setSchedules] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  const [isLoginPopup, setIsLoginPopup] = useState(false);

  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [writeReviewsModal, setWriteReviewsModal] = useState(false);
  const [workationModal, setWorkationModal] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

  const { processLogout, processOnPopupCheck } = useLocalStorage();

  const navigate = useNavigate();
  const { isLoggedIn } = useLocalStorage();

  const errMessageCheck = (errorMessage) => {
    if (errorMessage === "Expired token.") {
      setIsLoginPopup(true);
      processLogout();
    }
  };

  const onClickLike = async (e, facilityId, type) => {
    let apiUrl;
    let method;
    let currentIsBookmarked;

    if (isLoggedIn) {
      if (type === "Workation Office") {
        apiUrl = `/api/workation-offices/${facilityId}/bookmark`;
        method = isWorkationBookmarked[facilityId] ? "DELETE" : "POST";
        currentIsBookmarked = isWorkationBookmarked[facilityId];
        try {
          setIsWorkationBookmarked((prev) => ({
            ...prev,
            [facilityId]: !currentIsBookmarked,
          }));
          await axiosInstance({
            url: apiUrl,
            method,
          });
        } catch (error) {
          setIsWorkationBookmarked((prev) => ({
            ...prev,
            [facilityId]: currentIsBookmarked,
          }));
          errMessageCheck(error.response.data.errorMessage);
        }
      } else {
        apiUrl = `/api/facilities/${facilityId}/bookmark`;
        method = isBookmarked[facilityId] ? "DELETE" : "POST";
        currentIsBookmarked = isBookmarked[facilityId];
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
        }
      }
    } else {
      setIsLoginPopup(true);
    }
  };

  const popupCheck = () => {
    // 사용자 팝업 상태 조회 API 호출
    const fetchPopup = async () => {
      try {
        const res = await axiosInstance.get("/api/users/popup-status");
        const data = res.data;
        if (data.popupStatus === "review-writing") {
          processOnPopupCheck();
        }
        navigate("/");
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
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
        location,
        facilityCount,
        viewMode,
        selectLocationName,
        detailInfo,
        isBookmarked,
        isWorkationBookmarked,
        schedules,
        disabled,

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
        setLocation,
        setFacilityCount,
        setViewMode,
        setSelectLocationName,
        setDetailInfo,
        setIsBookmarked,
        setIsWorkationBookmarked,
        setSchedules,
        setDisabled,

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
