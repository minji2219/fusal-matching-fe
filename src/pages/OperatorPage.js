import { useState } from "react";
import "../css/pages/OperatorPage.css";
import StadiumCard from "../components/StadiumCard";
const OperatorPage = () => {
  const [editDisabled, setEditDisabled] = useState(true);
  const [saveBtnDisplay, setSaveBtnDisplay] = useState("hidden");
  const handleEdit = () => {
    setEditDisabled(false);
    setSaveBtnDisplay("visible");
  };
  const handleUpdate = () => {
    //TODO:데이터 수정 서버 생성시 API 연결
    setEditDisabled(true);
    setSaveBtnDisplay("hidden");
  };
  return (
    <div className="center">
      <div className="operator__top">
        <div className="mypage__teaminfo">
          <div className="mypage__icons">
            <span
              className="mypage__icon material-symbols-outlined"
              style={{ visibility: saveBtnDisplay }}
              onClick={handleUpdate}
            >
              save
            </span>
            <span
              className="mypage__icon material-symbols-outlined"
              onClick={handleEdit}
            >
              edit
            </span>
          </div>
          <div className="mypage__teamintro">
            <div className="team__contents">
              <div className="team__content">
                <div className="team__key">이름</div>
                <input
                  className="team__value"
                  placeholder="신지훈"
                  disabled={editDisabled}
                />
              </div>
              <div className="team__content">
                <div className="team__key">아이디</div>
                <input
                  className="team__value"
                  placeholder="wlgnstls0413"
                  disabled={editDisabled}
                />
              </div>
              <div className="team__content">
                <div className="team__key">전화번호</div>
                <input
                  className="team__value"
                  placeholder="010-8131-8655"
                  disabled={editDisabled}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mypage__icon">
            <span className="material-symbols-outlined">select_check_box</span>
            신규 예약 신청
          </div>
          {/* MatchingList */}
        </div>
      </div>
      <hr />
      <div className="stadium__cards">
        <StadiumCard />
        <div className="new-stadium__card">
          <span
            className="plus__stadium material-symbols-outlined"
            style={{ fontSize: "150px" }}
          >
            Add
          </span>
        </div>
      </div>
    </div>
  );
};

export default OperatorPage;
