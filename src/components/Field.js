import React, { useState } from "react";
import img from "../image/Group 84.png";
import "../css/components/Field.css";
import Modal from "./Modal";
import profile from "../image/ball.png";
import { changeText } from "../helper/ChangeText";

const Field = ({ field, endTime, startTime, date, fetchField }) => {
  const [reserveSort, setReserveSort] = useState();
  const [modalState, setModalState] = useState(false);
  const [hover, setHover] = useState("none");

  const MatchingReserve = () => {
    setReserveSort("매칭 신청");
    setModalState(true);
  };
  const WholdReserve = () => {
    setReserveSort("전체 대여");
    setModalState(true);
  };

  return (
    <div className="field">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className="field_name">{field.fieldNum}구장</div>
      <div className="field_background">
        <div className="field_main">
          <img src={img} alt="field" className="field_img" />

          {field.team ? (
            field.team[1] ? (
              // 필드에 두 팀 모두 예약일때
              <>
                <div
                  className="matching_team"
                  onMouseOver={() => setHover("block")}
                  onMouseOut={() => setHover("none")}
                >
                  <img
                    src={
                      field.team[0].imageUrl ? field.team[0].imageUrl : profile
                    }
                    style={{ width: "80px", height: "80px", marginTop: "15px" }}
                    alt="profile"
                  />
                  <div className="teaminfo" style={{ display: hover }}>
                    <div>팀명 : {field.team[0].teamName}</div>
                    <div>실력 : {changeText(field.team[0].skill)}</div>
                    <div>매너 : {changeText(field.team[0].manner)}</div>
                  </div>
                </div>
                <div
                  className="matching_team"
                  style={{ left: "500px" }}
                  onMouseOver={() => setHover("block")}
                  onMouseOut={() => setHover("none")}
                >
                  <img
                    src={
                      field.team[1].imageUrl ? field.team[1].imageUrl : profile
                    }
                    style={{ width: "80px", height: "80px", marginTop: "15px" }}
                    alt="profile"
                  />
                  <div className="teaminfo" style={{ display: hover }}>
                    <div>팀명 : {field.team[1].teamName}</div>
                    <div>실력 : {changeText(field.team[1].skill)}</div>
                    <div>매너 : {changeText(field.team[1].manner)}</div>
                  </div>
                </div>
              </>
            ) : (
              // 필드에 한팀만 예약일때
              <>
                <div
                  className="matching_team"
                  onMouseOver={() => setHover("block")}
                  onMouseOut={() => setHover("none")}
                >
                  <img
                    src={
                      field.team[0].imageUrl ? field.team[0].imageUrl : profile
                    }
                    style={{ width: "80px", height: "80px", marginTop: "15px" }}
                    alt="profile"
                  />
                  <div className="teaminfo" style={{ display: hover }}>
                    <div>팀명 : {field.team[0].teamName}</div>
                    <div>실력 : {changeText(field.team[0].skill)}</div>
                    <div>매너 : {changeText(field.team[0].manner)}</div>
                  </div>
                </div>
                {field.allRental ? (
                  <></>
                ) : (
                  <button className="matching_btn" onClick={MatchingReserve}>
                    매칭 신청
                  </button>
                )}
              </>
            )
          ) : (
            // 필드에 아무 예약도 없을때
            <>
              <button
                className="matching_btn"
                style={{ top: "160px", left: "145px" }}
                onClick={MatchingReserve}
              >
                매칭 신청
              </button>
              <button className="matching_btn" onClick={MatchingReserve}>
                매칭 신청
              </button>
            </>
          )}
        </div>
      </div>
      {field.team ? (
        <>
          {field.allRental ? (
            <div className="complete">예약이 완료된 구장입니다.</div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <button className="whole_btn" onClick={WholdReserve}>
          전체 대여
        </button>
      )}

      {modalState ? (
        <>
          <Modal
            fetchField={fetchField}
            field={field}
            setModalState={setModalState}
            reserveSort={reserveSort}
            fieldName={field.fieldNum}
            date={date}
            startTime={startTime}
            endTime={endTime}
          />
          <div
            style={{
              backgroundColor: "rgba(179, 179, 179, 0.5)",
              width: "100%",
              height: "100%",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "1",
            }}
          ></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Field;
