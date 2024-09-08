import { useContext, useState } from "react"
import { AppContext } from "../../../context/AppContext"
import "./LocationMap.css";
import { MapMarker } from "react-kakao-maps-sdk";
import { axiosInstance } from "../../../common/func/axios";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import WorkationDetail from "./WorkationDetail/WorkationDetail";
import { categoryMatch } from "../../../common/func/match"

export default function LocationMap () {
  const { detailInfo, 
          isBookmarked, setIsBookmarked, 
          setWorkationModal, 
          onClickLike,
          errMessageCheck
        } = useContext(AppContext);
  const [markers, setMarkers] = useState(null);
  const [info, setInfo] = useState(null);
  const [selectCategory, setSelectCategory] = useState('');

  const onClickCategoryBtn = async (category) => {
    setSelectCategory(`${category}`);
    setInfo(null);
    try {
      const res = await axiosInstance.get(`/api/public/locations/${detailInfo.locationId}/facilities/search?facilityType=${category}`);
      const data = res.data;
      setMarkers(data);
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
      console.error("Error fetching locations:", err);
    };
  };

  const onClickMarker = async (marker) => {
    setInfo(marker);
    const apiUrl = `/api/facilities/${marker.facilityId}/bookmark`;
    try {
      const response = await axiosInstance.get(apiUrl);
      const data = response.data;
      setIsBookmarked({
        [marker.facilityId]: data.isBookmarked
      });
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      console.log(error);
    };
  };

  return (
    <div className="locationDetail">
      <div className="category">
        <button onClick={() => onClickCategoryBtn("workation")}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.3664 9.61381L10.4914 0.863807C10.433 0.789392 10.3583 0.729231 10.2732 0.687863C10.1881 0.646495 10.0947 0.625 10 0.625C9.9054 0.625 9.81199 0.646495 9.72686 0.687863C9.64174 0.729231 9.56712 0.789392 9.50864 0.863807L2.63364 9.61381C2.54722 9.72389 2.50024 9.85979 2.50024 9.99974C2.50024 10.1397 2.54722 10.2756 2.63364 10.3857L9.50864 19.1357C9.56712 19.2101 9.64174 19.2703 9.72686 19.3116C9.81199 19.353 9.9054 19.3745 10 19.3745C10.0947 19.3745 10.1881 19.353 10.2732 19.3116C10.3583 19.2703 10.433 19.2101 10.4914 19.1357L17.3664 10.3857C17.4529 10.2756 17.4998 10.1397 17.4998 9.99974C17.4998 9.85979 17.4529 9.72389 17.3664 9.61381ZM10.625 12.1544V3.05678L15.8922 9.7599L10.625 12.1544ZM9.37504 12.1544L4.10786 9.7599L9.37504 3.05678V12.1544ZM9.37504 13.5271V16.9427L5.20082 11.6302L9.37504 13.5271Z" fill="#1D2024"/>
          </svg>
          <span className="item work">Workation</span>
        </button>  
        <button onClick={() => onClickCategoryBtn("restaurant")}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16.875 3.12489V17.4999C16.875 17.6656 16.8092 17.8246 16.6919 17.9418C16.5747 18.059 16.4158 18.1249 16.25 18.1249C16.0842 18.1249 15.9253 18.059 15.8081 17.9418C15.6908 17.8246 15.625 17.6656 15.625 17.4999V13.7499H11.875C11.7092 13.7499 11.5503 13.684 11.4331 13.5668C11.3158 13.4496 11.25 13.2906 11.25 13.1249C11.279 11.6278 11.4681 10.138 11.8141 8.68114C12.5781 5.51786 14.0266 3.39754 16.0039 2.55067C16.0989 2.50996 16.2026 2.49346 16.3056 2.50266C16.4086 2.51185 16.5077 2.54645 16.594 2.60335C16.6803 2.66026 16.7512 2.73769 16.8002 2.82871C16.8493 2.91973 16.875 3.02149 16.875 3.12489ZM9.36641 3.02254C9.35417 2.94048 9.32571 2.86167 9.28269 2.79072C9.23967 2.71976 9.18295 2.65809 9.11585 2.60928C9.04874 2.56048 8.97259 2.52553 8.89184 2.50647C8.81108 2.4874 8.72734 2.48461 8.6455 2.49825C8.56365 2.51189 8.48534 2.54169 8.41513 2.58592C8.34492 2.63014 8.28423 2.6879 8.23658 2.75583C8.18893 2.82376 8.15528 2.90049 8.1376 2.98156C8.11992 3.06263 8.11856 3.14641 8.13359 3.22801L8.74141 6.87489H6.875V3.12489C6.875 2.95913 6.80915 2.80016 6.69194 2.68294C6.57473 2.56573 6.41576 2.49989 6.25 2.49989C6.08424 2.49989 5.92527 2.56573 5.80806 2.68294C5.69085 2.80016 5.625 2.95913 5.625 3.12489V6.87489H3.75859L4.36641 3.22801C4.38144 3.14641 4.38008 3.06263 4.3624 2.98156C4.34472 2.90049 4.31107 2.82376 4.26342 2.75583C4.21577 2.6879 4.15507 2.63014 4.08487 2.58592C4.01466 2.54169 3.93635 2.51189 3.8545 2.49825C3.77266 2.48461 3.68892 2.4874 3.60816 2.50647C3.52741 2.52553 3.45126 2.56048 3.38415 2.60928C3.31705 2.65809 3.26033 2.71976 3.21731 2.79072C3.17429 2.86167 3.14583 2.94048 3.13359 3.02254L2.50859 6.77254C2.50298 6.80637 2.50011 6.8406 2.5 6.87489C2.50125 7.76068 2.81556 8.61751 3.3874 9.29399C3.95923 9.97048 4.75178 10.4231 5.625 10.5718V17.4999C5.625 17.6656 5.69085 17.8246 5.80806 17.9418C5.92527 18.059 6.08424 18.1249 6.25 18.1249C6.41576 18.1249 6.57473 18.059 6.69194 17.9418C6.80915 17.8246 6.875 17.6656 6.875 17.4999V10.5718C7.74822 10.4231 8.54077 9.97048 9.1126 9.29399C9.68444 8.61751 9.99875 7.76068 10 6.87489C9.99989 6.8406 9.99701 6.80637 9.99141 6.77254L9.36641 3.02254Z" fill="black"/>
          </svg>
          <span className="item rnt">Restaurant</span>
        </button>       
        <button onClick={() => onClickCategoryBtn("cafe")}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M16.25 6.25H2.5C2.33424 6.25 2.17527 6.31585 2.05806 6.43306C1.94085 6.55027 1.875 6.70924 1.875 6.875V10.625C1.87687 11.6891 2.10442 12.7406 2.54264 13.7102C2.98086 14.6799 3.61977 15.5455 4.41719 16.25H2.5C2.33424 16.25 2.17527 16.3158 2.05806 16.4331C1.94085 16.5503 1.875 16.7092 1.875 16.875C1.875 17.0408 1.94085 17.1997 2.05806 17.3169C2.17527 17.4342 2.33424 17.5 2.5 17.5H16.25C16.4158 17.5 16.5747 17.4342 16.6919 17.3169C16.8092 17.1997 16.875 17.0408 16.875 16.875C16.875 16.7092 16.8092 16.5503 16.6919 16.4331C16.5747 16.3158 16.4158 16.25 16.25 16.25H14.3328C15.29 15.4016 16.0159 14.3239 16.4422 13.118C17.236 13.0691 17.9813 12.7193 18.5263 12.14C19.0712 11.5606 19.3747 10.7953 19.375 10V9.375C19.375 8.5462 19.0458 7.75134 18.4597 7.16529C17.8737 6.57924 17.0788 6.25 16.25 6.25ZM18.125 10C18.1247 10.4044 17.9937 10.7978 17.7516 11.1216C17.5094 11.4454 17.169 11.6823 16.7812 11.7969C16.8432 11.4093 16.8745 11.0175 16.875 10.625V7.60781C17.2405 7.73703 17.5569 7.97634 17.7808 8.29281C18.0046 8.60928 18.1249 8.98736 18.125 9.375V10ZM8.75 4.375V1.875C8.75 1.70924 8.81585 1.55027 8.93306 1.43306C9.05027 1.31585 9.20924 1.25 9.375 1.25C9.54076 1.25 9.69973 1.31585 9.81694 1.43306C9.93415 1.55027 10 1.70924 10 1.875V4.375C10 4.54076 9.93415 4.69973 9.81694 4.81694C9.69973 4.93415 9.54076 5 9.375 5C9.20924 5 9.05027 4.93415 8.93306 4.81694C8.81585 4.69973 8.75 4.54076 8.75 4.375ZM11.25 4.375V1.875C11.25 1.70924 11.3158 1.55027 11.4331 1.43306C11.5503 1.31585 11.7092 1.25 11.875 1.25C12.0408 1.25 12.1997 1.31585 12.3169 1.43306C12.4342 1.55027 12.5 1.70924 12.5 1.875V4.375C12.5 4.54076 12.4342 4.69973 12.3169 4.81694C12.1997 4.93415 12.0408 5 11.875 5C11.7092 5 11.5503 4.93415 11.4331 4.81694C11.3158 4.69973 11.25 4.54076 11.25 4.375ZM6.25 4.375V1.875C6.25 1.70924 6.31585 1.55027 6.43306 1.43306C6.55027 1.31585 6.70924 1.25 6.875 1.25C7.04076 1.25 7.19973 1.31585 7.31694 1.43306C7.43415 1.55027 7.5 1.70924 7.5 1.875V4.375C7.5 4.54076 7.43415 4.69973 7.31694 4.81694C7.19973 4.93415 7.04076 5 6.875 5C6.70924 5 6.55027 4.93415 6.43306 4.81694C6.31585 4.69973 6.25 4.54076 6.25 4.375Z" fill="#1D2024"/>
          </svg>
          <span className="item cafe">Cafe</span>
        </button>  
        <button onClick={() => onClickCategoryBtn("accommodation")}> 
          <span className="item acc">Accommodation</span>
        </button>
      </div>
      {selectCategory !== '' && markers ? 
        markers.map((marker, idx) => (
          <MapMarker
            key={idx}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            image={{
              src: categoryMatch[selectCategory].img,
              size: {
                width: 25,
                height: 25,
              }
            }}
            onClick={() => onClickMarker(marker)}
          >
            {info && info.facilityId === marker.facilityId && (
              selectCategory === "workation" ? ( 
                <div className="markerCnt">
                  {/* {locations.map((location) => {
                    if(selectLocationName === location.locationName) {
                      return <img alt={location.locationName} src={location.thumbnail}></img> 
                    };
                  })} */}
                  <div>
                    { isBookmarked && isBookmarked[info.facilityId] ? (
                      <HeartFilled 
                        onClick={(e) => onClickLike(e, info.facilityId)} 
                        style={{ color: 'red', cursor: 'pointer' }} 
                      /> 
                      ) : (
                      <HeartOutlined 
                        onClick={(e) => onClickLike(e, info.facilityId)} 
                        style={{ color: 'black', cursor: 'pointer' }} 
                      />
                      )
                    }
                  </div>
                  <div className="facInfo">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="type">{categoryMatch[info.type].type}</span>
                      <span className="tit">{info.facilityName}</span>
                    </div>
                    <svg onClick={() => setWorkationModal(true)} xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M8.64795 6.89795L4.89795 10.6479C4.79228 10.7536 4.64895 10.813 4.49951 10.813C4.35007 10.813 4.20675 10.7536 4.10107 10.6479C3.9954 10.5423 3.93604 10.399 3.93604 10.2495C3.93604 10.1001 3.9954 9.95675 4.10107 9.85107L7.4531 6.49998L4.10201 3.14795C4.04969 3.09562 4.00818 3.03351 3.97986 2.96514C3.95155 2.89678 3.93697 2.82351 3.93697 2.74951C3.93697 2.67551 3.95155 2.60224 3.97986 2.53388C4.00818 2.46551 4.04969 2.4034 4.10201 2.35107C4.15433 2.29875 4.21645 2.25724 4.28482 2.22893C4.35318 2.20061 4.42645 2.18604 4.50045 2.18604C4.57445 2.18604 4.64772 2.20061 4.71608 2.22893C4.78445 2.25724 4.84656 2.29875 4.89889 2.35107L8.64889 6.10107C8.70126 6.15339 8.7428 6.21554 8.77111 6.28394C8.79942 6.35235 8.81395 6.42567 8.81386 6.49971C8.81377 6.57374 8.79907 6.64703 8.7706 6.71537C8.74213 6.7837 8.70045 6.84575 8.64795 6.89795Z" fill="#292C30"/>
                    </svg>
                  </div>
                  <WorkationDetail marker={info} />
                </div>
              ) : (
                <div className="markerCnt">
                  <div className="facInfo">
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                      <span className="type">{categoryMatch[info.type].type}</span>
                      <div className="likeCnt">
                        <span className="tit">{info.facilityName}</span>
                          { isBookmarked && isBookmarked[info.facilityId] ? (
                            <HeartFilled 
                              onClick={(e) => onClickLike(e, info.facilityId)} 
                              style={{ color: 'red', cursor: 'pointer', marginLeft: "auto" }} 
                            /> 
                            ) : (
                            <HeartOutlined 
                              onClick={(e) => onClickLike(e, info.facilityId)} 
                              style={{ color: 'black', cursor: 'pointer', marginLeft: "auto" }} 
                            />
                            )
                          }
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </MapMarker>
        ))
      : null}
    </div>
  )
}