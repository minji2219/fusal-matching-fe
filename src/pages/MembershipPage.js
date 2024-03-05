import React, { useEffect, useState } from "react";
import "../css/pages/MembershipPage.css";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../helper/api";

const MembershipPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkpw, setCheckpw] = useState("");
  const [idTextColor, setIdTextColor] = useState("black");
  const [idCheckBtn, setIdCheckBtn] = useState("중복확인");
  const [idDuplicationState, setIdDuplicationState] = useState();
  const [teamName, setTeamName] = useState();
  const [captainName, setCaptainName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [validtaionMent, setValidtaionMent] = useState("");
  const navigate = useNavigate();

  const checkIdDuplication = async (e) => {
    let pattern = /^[a-z0-9~!@#$%<>?^&*+]{4,45}$/;
    if (!pattern.test(id)) {
      alert(
        "아이디는 4~45자리의 영문 소문자, 숫자, 특수문자(~!@#$%<>?^&*+)만 사용 가능합니다."
      );
      return;
    }

    const postData = {
      idOrNick: id,
    };
    try {
      const data = await apiPost("teams/check-id", postData);
      if (data) {
        setIdDuplicationState(true);
        setIdTextColor("#1FBB25");
        setIdCheckBtn("ID적합");
      } else {
        setIdDuplicationState(false);
        setIdTextColor("gray");
        setIdCheckBtn("ID존재");
        e.target.style.backgroundColor = "white";
        e.target.style.border = "1px solid #EE4242";
        e.target.style.color = "#EE4242";
      }
    } catch (e) {
      console.log("server error");
    }
  };
  // TODO: 서버 작동 원상태로 돌아오면 아이디 중복확인 변경
  // useEffect(()=>{
  //   setIdDuplicationState(undefined)
  //   setIdCheckBtn("중복확인")
  // },[id])

  const handleMembership = async (e) => {
    e.preventDefault();
    if (id === "") {
      setValidtaionMent("아이디를 입력해주세요.");
      return;
    } else if (!idDuplicationState) {
      setValidtaionMent("아이디 중복확인을 진행해주세요.");
      return;
    } else if (pw === "") {
      setValidtaionMent("비밀번호를 입력해주세요.");
      return;
    } else if (pw !== checkpw) {
      setValidtaionMent("비밀번호가 일치하지 않습니다.");
      return;
    } else if (teamName === "") {
      setValidtaionMent("팀명을 입력해주세요.");
      return;
    } else if (captainName === "") {
      setValidtaionMent("주장 이름을 입력해주세요.");
      return;
    } else if (phone === "") {
      setValidtaionMent("주장 전화번호를 입력해주세요.");
      return;
    } else if (email === "") {
      setValidtaionMent("주장 이메일을 입력해주세요.");
      return;
    }

    const postData = {
      id: id,
      password: pw,
      teamName: teamName,
      captinName: captainName,
      tel: phone,
      email: email,
    };
    try {
      await apiPost("teams/new", postData);
      navigate("/login");
    } catch (e) {
      console.log("server error");
    }
  };
  return (
    <div className="membership__box">
      <div className="memebership__head">회원가입</div>
      <form className="membership__content" onSubmit={handleMembership}>
        <div className="membership__ment">
          광주에 있는 풋살장을 이용해보세요 !
        </div>
        <div className="input__icon input--membership">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            person
          </span>
          <input
            placeholder="팀 아이디"
            style={{ color: `${idTextColor}` }}
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
          />
          <button
            className="duplication-check__btn"
            type="button"
            // TODO:되는지 확인하기 checkDuplication으로만 적어보기(e)없이
            onClick={checkIdDuplication}
          >
            {idCheckBtn}
          </button>
        </div>
        {/* TODO:pw, pwcheck 같음 여부는 회원가입 완료 버튼 눌렀을 때 순차적으로 유효성 검사 진행하기 */}
        <div className="input__icon">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            lock
          </span>
          <input
            placeholder="팀 비밀번호 입력"
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
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
            placeholder="팀 비밀번호 확인"
            type="password"
            value={checkpw}
            onChange={(e) => {
              setCheckpw(e.target.value);
            }}
          />
        </div>

        <div className="input__icon">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            sports_soccer
          </span>
          <input
            placeholder="팀명"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
          />
        </div>

        <div className="input__icon">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            badge
          </span>
          <input
            placeholder="주장 이름"
            value={captainName}
            onChange={(e) => {
              setCaptainName(e.target.value);
            }}
          />
        </div>

        <div className="input__icon">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            call
          </span>
          <input
            placeholder="주장 전화번호"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div className="input__icon">
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
        </div>
        <div className="membership__validation">{validtaionMent}</div>
        <button className="membership__complete__btn">완료</button>
      </form>
    </div>
  );
};

export default MembershipPage;
