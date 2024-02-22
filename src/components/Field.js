import React, { useState } from "react";
import "../css/components/Field.css";
import Modal from "./Modal";
import profile from "../image/ball.png";
import { changeText } from "../helper/ChangeText";

const MatchingTeam = ({ team }) => {
  const [hover, setHover] = useState("none");

  return (
    <div
      className="matching__team"
      onMouseOver={() => setHover("block")}
      onMouseOut={() => setHover("none")}
    >
      <img
        className="matcing__team--profile"
        src={team.imageUrl ? team.imageUrl : profile}
        alt="team__profile"
      />
      <div className="matcing__team--info" style={{ display: hover }}>
        <div>팀명 : {team.teamName}</div>
        <div>실력 : {changeText(team.skill)}</div>
        <div>매너 : {changeText(team.manner)}</div>
      </div>
    </div>
  );
};

const Field = ({ field, fetchField }) => {
  const [reserveSort, setReserveSort] = useState();
  const [modalState, setModalState] = useState(false);

  const fieldOption = () => {
    if (field.team) {
      if (field?.team[0] && field?.team[1]) {
        return (
          <>
            <MatchingTeam team={field?.team[0]} />
            <MatchingTeam team={field?.team[1]} />
          </>
        );
      } else {
        return (
          <>
            <MatchingTeam team={field?.team[0]} />
            <button className="matching__btn" onClick={MatchingReserve}>
              매칭 신청
            </button>
          </>
        );
      }
    } else {
      return (
        <>
          <button className="matching__btn" onClick={MatchingReserve}>
            매칭 신청
          </button>
          <button className="matching__btn" onClick={MatchingReserve}>
            매칭 신청
          </button>
        </>
      );
    }
  };

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
      <div className="field__number">{field.fieldNum}구장</div>
      <div className="field__background">
        <div className="field__img">{fieldOption()}</div>
      </div>
      {field.team ? (
        field.allRental && (
          <div className="reserve--complete">* 예약이 완료된 구장입니다.</div>
        )
      ) : (
        <button className="whole--reserve__btn" onClick={WholdReserve}>
          전체 대여
        </button>
      )}

      {modalState ? (
        <>
          <Modal
            title="이 일정으로 예약할까요?"
            fetchField={fetchField}
            field={field}
            setModalState={setModalState}
            reserveSort={reserveSort}
            fieldName={field.fieldNum}
            date={field.matchingDate}
            startTime={field.startTime}
            endTime={field.endTime}
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
