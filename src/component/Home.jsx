import { useContext, useEffect } from "react";
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
  const { setLocations, viewMode, setViewMode, errMessageCheck, isLoginPopup, setIsLoginPopup } = useContext(AppContext);

  useEffect(() => {
  // 지역 조회 API 호출
  const fetchLocations = async () => {
    try {
      const res = await axiosInstance.get("/api/public/locations");
      const data = res.data;
      if (Array.isArray(data)) {
        setLocations(data);
      } else {
        console.error("Fetched locations data is not an array:", data);
        setLocations([]);
      }
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
      console.error("Error fetching locations:", err);
    }
  };
  fetchLocations();
  }, []); 

  return (
    <div className="DNAHome">
      <Popup />
      <LoginPopup />
      <Header />
      <div className="Content">
        <Recommend />
        <div 
          className="ViewContent" 
          // style={ 
          //   viewMode === "list" ? 
          //   { height: "119rem" } : 
          //   { height: "39rem" }}
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
