import React, { useContext, useEffect, useState, useRef } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { axiosInstance } from '../../common/func/axios';
import LocationMap from "./LocationMap/LocationMap";
import LocationInfo from './LocationInfo/LocationInfo';
import LocationImage from './LocationImage/LocationImage';
import "./DetailLocation.css";
import Header from '../Header/Header';

export default function DetailLocation() {
  const { detailInfo, setDetailInfo, errMessageCheck } = useContext(AppContext);
  const [centerMarker, setCenterMarker] = useState({ lat: 0, lng: 0 });
  const [count, setCount] = useState();
  const [imageCntOpen, setImageCntOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // Fade out 상태 추가
  const { locationId } = useParams();
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get(`/api/public/locations/${locationId}`);
        const data = res.data;
        setDetailInfo(data);
        setCenterMarker({ lat: data.latitude, lng: data.longitude });
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
      }
    };

    const fetchFacilitiesCount = async () => {
      try {
        const res = await axiosInstance.get(`/api/public/locations/${locationId}/facilities/count`);
        setCount(res.data);
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
      }
    };

    fetchLocations();
    fetchFacilitiesCount();
  }, [locationId]);

  const handleImageClick = () => {
    setImageCntOpen(true);
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleHideImages = () => {
    setFadeOut(true); // Fade out 상태 활성화
    setTimeout(() => {
      setImageCntOpen(false); // 일정 시간 후 이미지 숨김
      setFadeOut(false); // Fade out 상태 비활성화
    }, 300); // 애니메이션 지속 시간과 일치
  };

  return (
    <div className="DetailLocation">
      <Header />
      <div className='detailContent'>
        <LocationInfo />
        <div className="mapArea">
          <LocationMap centerMarker = {centerMarker}/>
        </div>
      </div>
      <div className='imageContent' onClick={handleImageClick}>
        <span>Images</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
          <path d="M14.5 4.70996L14.5 22.0582" stroke="black" strokeWidth="1.5"/>
          <path d="M22.2104 15L14.5001 22.7103L6.78983 15" stroke="black" strokeWidth="1.5"/>
        </svg>
      </div>
      <div 
        ref={imageRef} 
        style={{ 
          minHeight: '100vh', 
          display: imageCntOpen ? 'block' : 'none', 
          opacity: fadeOut ? 0 : 1, 
          transform: fadeOut ? 'translateY(-10px)' : 'translateY(0)', // 부드럽게 사라지도록 설정
          transition: 'opacity 0.3s ease, transform 0.3s ease' // opacity와 transform의 전환 설정
        }}
      >
        {imageCntOpen && (
          <LocationImage locationName={detailInfo.locationName} setImageCntOpen={handleHideImages} />
        )}
      </div>
    </div>
  );
}
