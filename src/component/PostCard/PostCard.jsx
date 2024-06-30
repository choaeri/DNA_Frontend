import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../common/func/axios";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";

export default function PostCard () {
  const {locations, setLocations} = useContext(AppContext);
  const [like, setLike] = useState();

  const onClickLikeBtn = (e) => {
    const value = e.target.value;
    setLike(!like);
    const onClickLike = async () => {
      await axiosInstance.post("api/locations/")
        .then((res) => {
          const data = res.data;
          if(Array.isArray(data)) {
            setLocations(data);
          } else {
            console.error("Fetched locations data is not an array:", data);
            setLocations([]);
          };
        })
        .catch((err) => {
          console.error("Error fetching locations:", err);
          setLocations([]); // 에러 발생 시 빈 배열로 초기화
        });
      };
      onClickLike();
  };

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
            extra={<Button icon={like ? <HeartFilled /> : <HeartOutlined />} value={location.name} onClick={onClickLikeBtn} ></Button>}
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
  )
};