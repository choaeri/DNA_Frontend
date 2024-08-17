import { Map } from 'react-kakao-maps-sdk';
import LocationDetail from './LocationDetail/LocationDetail';
import LocationMap from "./LocationMap/LocationMap";
import "./DetailLocation.css";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { axiosInstance } from '../../common/func/axios';

const { kakao } = window;
export default function DetailLocation () {
  const {setDetailInfo, selectLocationId} = useContext(AppContext);
  const [centerMarker, setCenterMarker] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get(`/api/locations/${selectLocationId}`);
        const data = res.data;
        setDetailInfo(data);
        setCenterMarker({
          lat: data.latitude,
          lng: data.longitude
        })
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="DetailLocation">
      <LocationDetail />
      <div className="mapArea">
        <Map
          className="map"
          center={centerMarker}
          level={8}
        >
          <LocationMap />
        </Map>
      </div>
    </div>
  )
};