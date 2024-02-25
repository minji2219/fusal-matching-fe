import React, { useState } from "react";
import "../css/components/Field.css";
import ReserveModal from "./ReserveModal";
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
      } else if (field.allRental) {
        return <MatchingTeam team={field?.team[0]} />;
      } else {
        return (
          <>
            <MatchingTeam team={field?.team[0]} />
            <button className="matching__btn" onClick={matchingReserve}>
              매칭 신청
            </button>
          </>
        );
      }
    } else {
      return (
        <>
          <button className="matching__btn" onClick={matchingReserve}>
            매칭 신청
          </button>
          <button className="matching__btn" onClick={matchingReserve}>
            매칭 신청
          </button>
        </>
      );
    }
  };

  const matchingReserve = () => {
    setReserveSort("matching");
    setModalState(true);
  };
  const wholeReserve = () => {
    setReserveSort("allRental");
    setModalState(true);
  };

  return (
    <div className="field">
      <div className="field__number">{field.fieldNum}구장</div>
      <div className="field__background">
        <div className="field__img">{fieldOption()}</div>
      </div>
      {!field.team && (
        <button className="whole--reserve__btn" onClick={wholeReserve}>
          전체 대여
        </button>
      )}

      {modalState && (
        <>
          <ReserveModal
            fetchField={fetchField}
            field={field}
            setModalState={setModalState}
            reserveSort={reserveSort}
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
      )}
    </div>
  );
};

export default Field;
