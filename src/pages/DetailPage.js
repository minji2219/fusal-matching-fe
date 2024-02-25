import React, { useEffect, useState } from "react";
import ImgSwiper from "../components/ImgSwiper";
import "../css/pages/DetailPage.css";
import Review from "../components/Review";
import { useLocation, useParams } from "react-router-dom";

import noresting from "../image/Group 100.png";
import yesparking from "../image/Group 101.png";
import yesshower from "../image/Group 105.png";
import { apiGet } from "../helper/api";

const DetailPage = () => {
  const location = useLocation();
  const name = location.state.name;
  const images = location.state.images;
  const norest = location.state.norest;
  const parking = location.state.parking;
  const shower = location.state.shower;
  const time = location.state.time;
  const phone = location.state.phone;
  const address = location.state.address;
  let params = useParams();

  const [reviews, setReviews] = useState();

  const fetchReviews = async () => {
    const data = await apiGet(`stadiums/reviews?id=${params.index}`);
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="center">
      <ImgSwiper width={1300} height={400} images={images} />
      <hr />
      <div className="info">
        <div className="info__description">
          <div>
            <div className="info__name">{name}</div>
            <div className="info__address">{address}</div>
            <div className="info__time">
              <span
                style={{ fontSize: "20px", marginRight: "5px" }}
                className="material-symbols-outlined"
              >
                history
              </span>
              이용시간대 {time}
            </div>
            <div className="info__phone">
              <span
                style={{ fontSize: "20px", marginRight: "5px" }}
                className="material-symbols-outlined"
              >
                phone_in_talk
              </span>
              {phone}
            </div>
          </div>
          <div className="round-stickers">
            {/* TODO:연중무휴 어떻게 데이터 보내는지 확인하기 */}
            {norest && <img src={noresting} alt="연중무휴" />}
            {parking && <img src={yesparking} alt="주차가능" />}
            {shower && <img src={yesshower} alt="샤워가능" />}
          </div>
        </div>
        <div className="info__review">
          <div className="review__head">
            <span
              className="review__icon material-symbols-outlined"
              style={{ fontSize: "35px" }}
            >
              rate_review
            </span>
            <div className="review__title">풋살장 리뷰</div>
            <div>+{reviews?.length}</div>
          </div>
          <div className="reviews">
            {reviews?.map((review) => (
              <Review key={review.writer} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
