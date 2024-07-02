import { Map, ZoomControl } from "react-kakao-maps-sdk";
import "./MapView.css";

export default function MapView () {
  return (
    <div className="mapArea">
      <Map
        className="map"
        center={{ lat: 37.45, lng: 128.65 }}
        level={11}
      >
        <ZoomControl position={"right"} />
      </Map>
    </div>
  )
};