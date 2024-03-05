import React from "react";
import ImgSwiper from "./ImgSwiper";
import "../css/components/StadiumList.css";
import { Link } from "react-router-dom";

import noresting from "../image/Group 100.png";
import yesparking from "../image/Group 101.png";
import yesshower from "../image/Group 105.png";

const StadiumList = ({
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
  return (
    <div className="stadium__card">
      <ImgSwiper width={"320px"} height={"250px"} images={images} />
      <div className="stadium__description">
        <div className="stadium__head">
          <div className="stadium__name">
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
          <div className="stadium__line"></div>
          <div className="stadium__price">
            {2}시간 ￦{Number(price).toLocaleString()}
          </div>
          <button>
            <Link to={"/reserve"} state={{ id: id }}>
              예약하기
            </Link>
          </button>
        </div>
        <div className="stadium__address">{address}</div>
        <div className="stadium__time">
          <span
            style={{ fontSize: "20px", marginRight: "5px" }}
            className="material-symbols-outlined"
          >
            history
          </span>
          이용시간대 {time}
        </div>
        <div className="stadium__phone">
          <span
            style={{ fontSize: "20px", marginRight: "5px" }}
            className="material-symbols-outlined"
          >
            phone_in_talk
          </span>
          {phone}
        </div>

        <div className="round-stickers">
          {/* TODO:연중무휴 어떻게 데이터 보내는지 확인하기 */}
          {norest && <img src={noresting} alt="연중무휴" />}
          {parking && <img src={yesparking} alt="주차가능" />}
          {shower && <img src={yesshower} alt="샤워가능" />}
        </div>
      </div>
      {/* <hr style={{ width: "1300px" }} /> */}
    </div>
  );
};

export default StadiumList;
