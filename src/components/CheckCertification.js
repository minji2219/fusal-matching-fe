import { useState } from "react";
import { apiPost } from "../helper/api";

const CheckCertification = ({ setNextBtn }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [certificationNum, setCertificationNum] = useState("");
  const [sendMentDisplay, setSendMentDisplay] = useState("none");
  const [hashedNumber, setHashedNumber] = useState();
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const sendEmail = async () => {
    const postData = {
      email: email,
    };
    try {
      const data = await apiPost("teams/send-email", postData);
      setHashedNumber(data);
      setSendMentDisplay("block");
    } catch (e) {
      console.log("server error");
    }
  };

  const checkCertificationNum = async () => {
    const postData = {
      userWrite: certificationNum,
      hashedNum: hashedNumber,
    };
    try {
      await apiPost("teams/check-num", postData);
      setNextBtnDisabled(false);
    } catch (e) {
      console.log("server error");
    }
  };
  return (
    <div className="pwfind__content">
      <div className="pwfind__ment">
        <div>가입했던 이메일을 입력해주세요. 인증번호를 보내드려요.</div>
        <div>그리고 인증번호를 입력하세요 !</div>
      </div>
      <div className="input__icon">
        <span
          style={{ fontSize: "30px" }}
          className="material-symbols-outlined"
        >
          person
        </span>
        <input
          placeholder="팀 아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="input__icon input--pwfind">
        <span
          style={{ fontSize: "30px" }}
          className="material-symbols-outlined"
        >
          email
        </span>
        <input
          placeholder="주장 이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button className="send-email__btn" type="button" onClick={sendEmail}>
          보내기
        </button>
      </div>
      <div className="input__icon input--pwfind">
        <span
          style={{ fontSize: "30px" }}
          className="material-symbols-outlined"
        >
          lock
        </span>
        <input
          placeholder="인증번호 입력"
          value={certificationNum}
          onChange={(e) => {
            setCertificationNum(e.target.value);
          }}
        />
        <button
          className="certification__btn"
          type="button"
          onClick={checkCertificationNum}
        >
          확인
        </button>
      </div>
      <div style={{ display: sendMentDisplay }}>
        이메일 주소로 인증번호를 보내드렸습니다.
      </div>
      <button
        className="pwfind--next__btn"
        disabled={nextBtnDisabled}
        onClick={() => {
          setNextBtn(true);
        }}
      >
        다음
      </button>
    </div>
  );
};

export default CheckCertification;
