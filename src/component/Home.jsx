import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { axiosInstance } from "../common/func/axios";
import './Home.css';
import Recommend from "./Recommend/Recommend";
import ListView from "./View/ListView/ListView";
import MapView from "./View/MapView/MapView";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AllReviews from './AllReviews/AllReviews';
import Popup from "./Popup/Popup";
import LoginPopup from './LoginPopup/LoginPopup';


export default function Home() {
  const { setLocations, location, setLocation, setFacilityCount, viewMode, setViewMode, errMessageCheck, isLoginPopup, setIsLoginPopup } = useContext(AppContext);

  useEffect(() => {
  // 지역 조회 API 호출
  const fetchLocations = async () => {
    try {
      const res = await axiosInstance.get("/api/public/locations");
      const data = res.data;
      if (Array.isArray(data)) {
        setLocations(data);
        data.forEach(locationItem => {
          const locationName = locationItem.locationName; // locationName을 가져옴

          if (['yangyang', 'samcheok', 'gangneung', 'sokcho'].includes(locationName)) {
            location.beach.push(locationItem);
          } else if (['chuncheon', 'inje', 'goseong', 'pyeongchang'].includes(locationName)) {
            location.mount.push(locationItem);
          } else if (['yeongwol', 'hoengseong', 'jeongseon', 'hongcheon'].includes(locationName)) {
            location.culture.push(locationItem);
          }
        });
        setLocation(location);
      } else {
        console.error("Fetched locations data is not an array:", data);
        setLocations([]);
      }
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
      console.error("Error fetching locations:", err);
    }
  };

  // 시설 수 API 호출
  const fetchFacilitiesCount = async () => {
    try {
      const res = await axiosInstance.get(`/api/public/locations/facilities/count`);
      setFacilityCount(res.data);
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
      console.error("Error fetching locations:", err);
    }
  };
  fetchLocations();
  fetchFacilitiesCount();
  }, []); 

  return (
    <div className="DNAHome">
      <Popup />
      <LoginPopup message={'Your token has expired.\nPlease log in again to continue.'} />
      <Header />
      <div className="Content">
        <Recommend />
        <div 
          className="ViewContent" 
          style={viewMode !== 'list' ? {paddingBottom: "4rem"} : null}
        >
          { viewMode === 'list' ? <ListView /> : <MapView /> }
        </div>
        <AllReviews />
        <div className="ViewBtn">
          <button 
            className="list" 
            onClick={() => setViewMode('list')} 
            style={viewMode === 'list' ? {backgroundColor: "var(--Gray-10, #FFF)"} : {backgroundColor: "#000", color: "var(--Gray-10, #FFF)"}}
          >List</button>
          <button 
            className="map" 
            onClick={() => setViewMode('map')}
            style={viewMode === 'map' ? {backgroundColor: "var(--Gray-10, #FFF)", color: "#000"} : {backgroundColor: "#000"}}
          >Map</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
