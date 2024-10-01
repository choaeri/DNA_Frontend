import { useEffect, useState, useContext } from "react";
import Header from "../Header";
import './RecommendAreas.css';
import { axiosInstance } from "../../../common/func/axios";
import InfoAreas from "./InfoAreas/InfoAreas";
import MapAreas from "./MapAreas/MapAreas";
import { Map } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../../context/AppContext';

const { kakao } = window;

export default function RecommendAreas() {
  const [step, setStep] = useState(0);
  const [recommendedArea, setRecommendedArea] = useState([]);  // Initialize with an empty array
  const [centerMarker, setCenterMarker] = useState({
    lat: 0,
    lng: 0
  });
  const navigate = useNavigate();
  const { errMessageCheck } = useContext(AppContext);

  const geocoder = new window.kakao.maps.services.Geocoder();

  const getLocationByAddress = async (address) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coord = new kakao.maps.LatLng(result[0].y, result[0].x);
        setCenterMarker({
          lat: coord.Ma,
          lng: coord.La
        });
      }
    });
  };

  useEffect(() => {
    getLocationByAddress('강원');
    const getRecommendedAreas = async () => {
      try {
        const res = await axiosInstance.get('/api/recommend/locations');
        const data = res.data;
        setRecommendedArea(data);
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
      }
    };
    getRecommendedAreas();
  }, [errMessageCheck]);

  return (
    <div className="RecommendAreas">
      <Header />
      {recommendedArea.length > 0 ? (
        <div className="rmdAreaCnt">
          <div className="header">
            <span className="tit">Recommended Areas</span>
          </div>
          <div className="content">
            <InfoAreas
              step={step}
              setStep={setStep}
              recommendedArea={recommendedArea}
            />
            <div className="mapArea">
              <Map
                className="map"
                center={centerMarker}
                level={12}
              >
                <MapAreas
                  step={step}
                  recommendedArea={recommendedArea}
                />
              </Map>
            </div>
          </div>
          <div className="footer" onClick={() => navigate("/survey")}>
            <span>Test again</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M3 6.85547L11.6741 6.85547" stroke="black" strokeWidth="0.75" />
              <path d="M8.14502 3L12.0002 6.85515L8.14502 10.7103" stroke="black" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      ) : recommendedArea.length === 0 ? (
        <div className="rmdAreaCnt">
          <span className="tit">Discover Amazing Destinations!</span>
          <span className="desp">
            Looking for your next travel adventure?
            <br />
            Explore these incredible places that offer a mix of culture, history, and unforgettable experiences.
            <br />
            Whether you're seeking a trendy urban vibe or a serene nature escape, we've got the perfect spots for you.
            <br />
            Get inspired and start planning your dream trip today!
          </span>
        </div>
      ) : null}
    </div>
  );
}
