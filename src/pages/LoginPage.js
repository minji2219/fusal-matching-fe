import React, { useState } from "react";
import "../css/pages/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../helper/api.js";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loginErrDisplay, setLoginErrDisplay] = useState("none");
  const navigate = useNavigate();

  const login = async () => {
    const postData = {
      id: id,
      password: pw,
    };
    const data = await apiPost("teams/login", postData);
    if (data) {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("userId", data.id);
      navigate("/");
    } else {
      setLoginErrDisplay("block");
    }
  };

  return (
    <div className="login__box">
      <div className="login__head">예약은 로그인 필요해요!</div>
      <div className="login__content">
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
        <div className="input__icon">
          <span
            style={{ fontSize: "30px" }}
            className="material-symbols-outlined"
          >
            lock
          </span>
          <input
            type="password"
            placeholder="팀 비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>

        <div className="login__btns">
          <button className="membership__btn">
            <Link to="/membership" style={{ color: "blue" }}>
              회원가입
            </Link>
          </button>
          <span>/</span>
          <button className="find__btn">
            <Link to="/pwfind" style={{ color: "blue" }}>
              비밀번호 찾기
            </Link>
          </button>
        </div>
        <div
          className="login__error-ment"
          style={{ display: `${loginErrDisplay}` }}
        >
          아이디 또는 비밀번호를 잘못 입력했습니다.
        </div>
        <button className="login__btn" onClick={login}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
