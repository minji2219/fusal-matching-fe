import React, { useState } from "react";
import "../css/pages/PwfindPage.css";
import CheckCertification from "../components/CheckCertification";
import MakeNewPw from "../components/MakeNewPw";

const PwFindPage = () => {
  const [nextBtn, setNextBtn] = useState(false);

  return (
    <div>
      <div className="pwfind__box">
        <div className="pwfind__head">비밀번호 찾기</div>
        {!nextBtn ? (
          <CheckCertification setNextBtn={setNextBtn} />
        ) : (
          <MakeNewPw />
        )}
      </div>
    </div>
  );
};

export default PwFindPage;
