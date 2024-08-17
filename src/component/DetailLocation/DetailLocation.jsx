import { Map } from 'react-kakao-maps-sdk';
import LocationDetail from './LocationDetail/LocationDetail';
import LocationMap from "./LocationMap/LocationMap";
import "./DetailLocation.css";
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const { kakao } = window;
export default function DetailLocation () {
  const {selectLocation} = useContext(AppContext);
  const [centerMarker, setCenterMarker] = useState({
    lat: 0,
    lng: 0
  });

  const geocoder = new window.kakao.maps.services.Geocoder();
  const getLocationByAddress = async (address) => {
    geocoder.addressSearch(address, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const coord = new kakao.maps.LatLng(result[0].y, result[0].x);
        setCenterMarker({
          lat: coord.Ma,
          lng: coord.La
        })
      };
    });
  };

  // useEffect(() => {
  //   const match = {
  //     "SOCKCHO": '속초',
  //     "CHUNCHEON": '춘천',
  //     "YANGYANG": '양양',
  //     "GANGNEUNG": '강릉',
  //     "WONJU" : '원주',
  //     "SAMCHEOK": '삼척'
  //   };
  //   getLocationByAddress(match[selectLocation]);
  // }, []);

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