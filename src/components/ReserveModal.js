import React, { useContext, useState } from "react";
import "../css/components/ReserveModal.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { apiPost } from "../helper/api";

const ReserveModal = ({ fetchField, reserveSort, setModalState, field }) => {
  const { rightLogin, idData } = useContext(UserContext);
  const [modalTitle, setModalTitle] = useState("이 일정으로 예약할까요?");
  const [headColor, setHeadColor] = useState("#EE8042"); //오렌지색
  const [reserveComplete, setReserveComplete] = useState(false);
  const navigate = useNavigate();

  const applyMatching = async () => {
    const postData = {
      matchingId: field.matchingId,
      teamId: idData,
    };
    await apiPost("matching/apply", postData);
  };

  const createMatching = async () => {
    const postData = {
      team: idData,
      stadium: field.stadiumId,
      field: field.id,
      allRental: reserveSort === "allRental" ? true : false,
    };
    await apiPost("matching/create", postData);
  };

  const matchingReserve = () => {
    if (rightLogin) {
      try {
        if (field.team) {
          //한팀이 신청한 필드에 매칭신청을 할때
          applyMatching();
        } else {
          //아무도 신청하지 않은 필드에 매칭신청을 할때
          createMatching();
        }
        setModalTitle("예약이 완료되었습니다 !");
        setHeadColor("#4287EE");
        setReserveComplete(true);
        fetchField();
      } catch {
        alert("에러 발생");
      }
    } else {
      alert("예약은 로그인이 필요합니다");
      navigate("/login");
    }
  };

  return (
    <div className="modal">
      <div className="modal__head" style={{ backgroundColor: `${headColor}` }}>
        <div className="modal_title">{modalTitle}</div>
        <span
          className="cancel__btn material-symbols-outlined"
          onClick={() => setModalState(false)}
        >
          cancel
        </span>
      </div>
      <div className="modal__content">
        <div style={{ fontWeight: "700", marginBottom: "10px" }}>
          [ {reserveSort === "matching" ? "매칭 신청" : "전체 대여"} ]
        </div>
        <div style={{ marginBottom: "5px" }}>
          {field.fieldName}구장 {field.date}
        </div>
        <div style={{ marginBottom: "20px" }}>
          {field.startTime} ~ {field.endTime}
        </div>
        {reserveComplete ? (
          <div>My Page에서 다시 확인할 수 있습니다.</div>
        ) : (
          <div>
            <button
              style={{
                marginRight: "15px",
                backgroundColor: `${headColor}`,
              }}
              onClick={matchingReserve}
            >
              예약
            </button>
            <button onClick={() => setModalState(false)}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveModal;
