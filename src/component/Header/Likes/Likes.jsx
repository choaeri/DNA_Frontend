import { useContext, useEffect, useState } from "react";
import Header from "../Header";
import useLocalStorage from "../../../utils/useLocalStorage";
import { AppContext } from "../../../context/AppContext";
import { axiosInstance } from "../../../common/func/axios";
import { categoryMatch } from "../../../common/func/match";
import "./Likes.css";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export default function Likes () {
  const { isBookmarked, setIsBookmarked, 
          onClickLike, 
          errMessageCheck
        } = useContext(AppContext);
  const [bookmarkList, setBookmarkList] = useState();
  const { isLoggedIn } = useLocalStorage();

  useEffect(() => {
    const fetchBookmarkList = async () => {
      const apiUrl = `/api/facilities/bookmark`;
      try {
        const res = await axiosInstance.get(apiUrl);
        const data = res.data;
        if (Array.isArray(data)) {
          setBookmarkList(data);
          const newIsBookmarked = {};
          
          const fetchBookmark = async (facilityId) => {
            const apiUrl = `/api/facilities/${facilityId}/bookmark`;
            try {
              const response = await axiosInstance.get(apiUrl);
              const data = response.data;
              newIsBookmarked[facilityId] = data.isBookmarked;
            } catch (error) {
              errMessageCheck(error.response.data.errorMessage);
              console.log(error);
            };
          };
          await Promise.all(data.map(item => fetchBookmark(item.facilityId)));
          setIsBookmarked(newIsBookmarked);
        };
      } catch (error) {
        errMessageCheck(error.response.data.errorMessage);
        console.log(error);
      };
    };
    fetchBookmarkList();
  }, []);

  return (
    <div className="Likes">
      <Header />
      <div className="bmkCnt">
        <div className="header">
          <span className="tit">Likes</span>
        </div>
        <div className="content">
          { bookmarkList?.map((bookmark, idx) => {
            return (
              <div className="item" key={idx}>
                <span className="type">{categoryMatch[bookmark.type].type}</span>
                <div className="like">
                  <span className="name">{bookmark.facilityName}</span>
                  { isBookmarked[bookmark.facilityId] ? (
                    <HeartFilled 
                      onClick={(e) => onClickLike(e, bookmark.facilityId)} 
                      style={{ color: 'red', cursor: 'pointer', marginLeft: "auto" }} 
                    /> 
                    ) : (
                    <HeartOutlined 
                      onClick={(e) => onClickLike(e, bookmark.facilityId)} 
                      style={{ color: 'black', cursor: 'pointer',  marginLeft: "auto" }} 
                    />
                    )
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};