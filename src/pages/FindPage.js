import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/pages/FindPage.css";
import axios from "axios";
import FindPage2 from "../components/FindPage2";

const FindPage = () => {
  const [email, setEmail] = useState();
  const [hidden, setHidden] = useState("hidden");
  const [checkNumber, setCheckNumber] = useState();
  const [nextBtn, setNextBtn] = useState(false);
  const [hashedNumber, setHashedNumber] = useState();
  const [disabled, setDisabled] = useState(true);

  const sendEmail = async () => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API + "/teams/send-email",
        {
          email: email,
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setHashedNumber(result.data);
      setHidden("visible");
    } catch (err) {
      console.log("err입니당~", err);
    }
  };

  const checkNum = async () => {
    try {
      const result = await axios.post(
        "https://6f2b-121-147-100-85.ngrok-free.app/teams/check-num",
        {
          userWrite: checkNumber,
          hashedNum: hashedNumber,
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(result.data);
      setDisabled(false);
    } catch (err) {
      console.log("err입니당~", err);
    }
  };
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className="findbox">
        <div className="find_ment">비밀번호 찾기</div>
        {!nextBtn ? (
          <>
            <div className="find_ment2">
              <div>가입했던 이메일을 입력해주세요. 인증번호를 보내드려요.</div>
              <div>그리고 인증번호를 입력하세요 !</div>
            </div>
            <div className="find_input">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{ fontSize: "30px" }}
                  className="material-symbols-outlined"
                >
                  person
                </span>
                <input placeholder="팀 아이디" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{ fontSize: "30px" }}
                  className="material-symbols-outlined"
                >
                  email
                </span>
                <input
                  placeholder="주장 이메일"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button className="btn_find_ok" onClick={sendEmail}>
                  보내기
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{ fontSize: "30px" }}
                  className="material-symbols-outlined"
                >
                  lock
                </span>
                <input
                  placeholder="인증번호 입력"
                  onChange={(e) => {
                    setCheckNumber(e.target.value);
                  }}
                />
                <button className="btn_find_ok" onClick={checkNum}>
                  확인
                </button>
              </div>
              <div
                className="find_ment2"
                style={{ margin: "0px", visibility: hidden }}
              >
                <div>
                  사이트에 등록된 이메일 주소로 인증번호를 보내드렸습니다.
                </div>
                <div>인증번호를 입력하세요.</div>
              </div>
              <button
                className="btn_find_next"
                disabled={disabled}
                onClick={() => {
                  setNextBtn(true);
                }}
              >
                다음
              </button>
            </div>
          </>
        ) : (
          <FindPage2 />
        )}
      </div>
    </div>
  );
};

export default FindPage;
