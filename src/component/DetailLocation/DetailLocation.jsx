import { Map } from 'react-kakao-maps-sdk';
import LocationDetail from './LocationDetail/LocationInfo';
import LocationMap from "./LocationMap/LocationMap";
import "./DetailLocation.css";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { axiosInstance } from '../../common/func/axios';
import LocationInfo from './LocationDetail/LocationInfo';
import { useParams } from 'react-router-dom';

export default function DetailLocation () {
  const {setDetailInfo, selectLocationId} = useContext(AppContext);
  const [centerMarker, setCenterMarker] = useState({
    lat: 0,
    lng: 0
  });
  const {locationId} = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get(`/api/locations/${locationId}`);
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
      <LocationInfo />
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