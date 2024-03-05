import { useState } from "react";

const MakeNewPw = () => {
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const makeNewPw = (e) => {
    //TODO:비밀번호 변경 API 생성시 만들 함수
    e.preventDefault();
    if (pw !== checkPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };
  return (
    <form className="pwfind__content" onSubmit={makeNewPw}>
      <div className="pwfind__ment">새로운 비밀번호를 입력하세요.</div>
      <div className="input__icon">
        <span
          style={{ fontSize: "30px" }}
          className="material-symbols-outlined"
        >
          lock
        </span>
        <input
          placeholder="새로운 팀 비밀번호"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      <div className="input__icon">
        <span
          style={{ fontSize: "30px" }}
          className="material-symbols-outlined"
        >
          lock
        </span>
        <input
          placeholder="새로운 팀 비밀번호 확인"
          type="password"
          value={checkPw}
          onChange={(e) => setCheckPw(e.target.value)}
        />
      </div>
      <button className="pwfind--next__btn">완료</button>
    </form>
  );
};

export default MakeNewPw;
