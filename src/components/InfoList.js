import React, { useContext } from "react";
import ImgSwiper from "./ImgSwiper";
import "../css/components/InfoList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { StadiumInfoContext } from "../context/StadiumInfoContext";

import noresting from "../image/Group 100.png";
// import rest from '../'
import yesparking from "../image/Group 101.png";
import noparking from "../image/Group 102.png";
import yesshower from "../image/Group 105.png";
import noshower from "../image/Group 107.png";

const InfoList = ({
  id,
  price,
  name,
  address,
  time,
  phone,
  images,
  norest,
  parking,
  shower,
}) => {
  // const {value} = useContext(StadiumInfoContext)
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className="card">
        <ImgSwiper width={320} height={250} images={images} />
        <div className="description">
          <div className="head">
            <div className="name">
              <Link
                to={`/info/${id}`}
                state={{
                  images: images,
                  norest: norest,
                  parking: parking,
                  shower: shower,
                  name: name,
                  time: time,
                  phone: phone,
                  address: address,
                }}
              >
                {name}
              </Link>
            </div>
            <div className="line"></div>
            <div className="price">
              2시간 ￦{Number(price).toLocaleString()}
            </div>
            <div>
              <button>
                <Link to={"/reserve"} state={{ id: id }}>
                  예약하기
                </Link>
              </button>
            </div>
          </div>

          <div className="address">{address}</div>
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
      <hr style={{ width: "1300px" }} />
    </div>
  );
};

export default InfoList;
