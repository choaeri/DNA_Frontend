import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../common/func/axios";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";

export default function PostCard() {
  const { locations } = useContext(AppContext);
  const { isLogin } = useContext(AppContext);
  const [isLike, setIsLike] = useState({});
  const [likeCount, setLikeCount] = useState({});

  // 좋아요 수 조회 요청
  const fetchLikeCount = async (locationId) => {
    const apiUrl = `/api/locations/${locationId}/like/count`;
    try {
      const response = await axiosInstance.get(apiUrl);
      setLikeCount((prev) => ({ ...prev, [locationId]: response.data.likeCount }));
    } catch (error) {
      // 에러 처리
    }
  };

  // 좋아요 여부 조회 요청
  const fetchLocationLike = async (locationId) => {
    if (isLogin) {
      const apiUrl = `/api/locations/${locationId}/like`;
      try {
        const response = await axiosInstance.get(apiUrl);
        setIsLike((prev) => ({ ...prev, [locationId]: response.data.isLike }));
      } catch (error) {
        // 에러 처리
      }
    } else {
      setIsLike((prev) => ({ ...prev, [locationId]: false }));
    }
  };

  // 좋아요 요청
  const onClickLike = async (locationId) => {
    const apiUrl = `/api/locations/${locationId}/like`;
    const method = isLike[locationId] ? "DELETE" : "POST";
    try {
      await axiosInstance({
        url: apiUrl,
        method,
      });
      fetchLocationLike(locationId);
      fetchLikeCount(locationId);
    } catch (error) {
      // 에러 처리
    }
  };

  useEffect(() => {
    locations.forEach((location) => {
      fetchLocationLike(location.id);
      fetchLikeCount(location.id);
    });
  }, [locations]);

  return (
    <div className="CardContent">
      <header>
        <h2>Best Workation Recommend</h2>
      </header>
      <button className="onMap">map</button>
      <div className="cardCnt">
        {locations.map((location, index) => (
          <Card
            key={index}
            className="card"
            hoverable
            extra={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isLike[location.id] ? (
                  <HeartFilled 
                    onClick={() => onClickLike(location.id)} 
                    style={{ color: 'red', cursor: 'pointer' }} 
                  />
                ) : (
                  <HeartOutlined 
                    onClick={() => onClickLike(location.id)} 
                    style={{ color: 'gray', cursor: 'pointer' }} 
                  />
                )}
                <span style={{ marginLeft: '8px' }}>{likeCount[location.id]}</span>
              </div>
            }
            cover={<img alt={location.name} src={location.thumbNail} />}
          >
            <Meta title={location.name} />
            <p>temperature: {location.weatherInfo.temperature}</p>
            <p>humidity: {location.weatherInfo.humidity}</p>
            <p>cloudiness: {location.weatherInfo.cloudiness}</p>
            <p>windSpeed: {location.weatherInfo.windSpeed}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
