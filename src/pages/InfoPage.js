import React, { useContext, useEffect, useState } from "react";
import { StadiumInfoContext } from "../context/StadiumInfoContext";
import ImgSwiper from "../components/ImgSwiper";
import "../css/pages/InfoPage.css";
import img from "../image/사장님.jpg";
import Review from "../components/Review";
import { useLocation, useParams } from "react-router-dom";

import noresting from "../image/Group 100.png";
// import rest from '../'
import yesparking from "../image/Group 101.png";
import noparking from "../image/Group 102.png";
import yesshower from "../image/Group 107.png";
import noshower from "../image/Group 105.png";
import axios from "axios";

const InfoPage = () => {
  // const {value} = useContext(StadiumInfoContext)
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
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await axios.get(
          `https://6f2b-121-147-100-85.ngrok-free.app/stadiums/reviews?id=${params.index}`,
          {
            headers: {
              "Content-Type": `application/json`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setReviews(result.data);
      } catch (err) {
        console.log("err입니당~", err);
      }
    };
    fetchReviews();
  }, []);
  console.log(reviews);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className="center">
        <ImgSwiper width={1300} height={400} images={images} />
        <hr />
        <div className="infos">
          <div className="infos_stadium">
            <div className="description">
              <div
                className="name"
                style={{ marginBottom: "20px", fontSize: "40px" }}
              >
                {name}
              </div>
              <div
                className="address"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                {address}
              </div>
              <div className="time">
                <span
                  style={{ fontSize: "20px" }}
                  className="material-symbols-outlined"
                >
                  history
                </span>{" "}
                이용시간대 {time}
              </div>
              <div className="phone">
                <span
                  style={{ fontSize: "20px" }}
                  className="material-symbols-outlined"
                >
                  phone_in_talk
                </span>{" "}
                {phone}
              </div>
            </div>
            <div style={{ marginRight: "50px" }}>
              <img className="master_img" src={img} alt="사장님" />
              <div className="" style={{ marginLeft: "160px" }}>
                신사장님
              </div>
              <div
                className="round_sticker"
                style={{ display: "flex", gap: "20px" }}
              >
                {norest ? (
                  <img src={noresting} alt="연중무휴" />
                ) : (
                  <img src={noresting} alt="휴무" />
                )}
                {parking ? (
                  <img src={yesparking} alt="주차가능" />
                ) : (
                  <img src={noparking} alt="주차불가능" />
                )}
                {shower ? (
                  <img src={yesshower} alt="샤워가능" />
                ) : (
                  <img src={noshower} alt="샤워불가능" />
                )}
              </div>
            </div>
          </div>
          <div className="infos_review">
            <div className="review_head">
              <div
                className="review_count"
                style={{ width: "50px", height: "50px" }}
              >
                <span class="material-symbols-outlined">rate_review</span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                풋살장 리뷰
              </div>
              <div style={{ marginLeft: "5px" }}>+{reviews?.length}</div>
            </div>
            <div className="reviews">
              {reviews?.map((review) =>
                review.review ? <Review review={review} /> : <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
