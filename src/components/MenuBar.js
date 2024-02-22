import React, { useContext, useState } from "react";
import "../css/components/MenuBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MenuBar = () => {
  const { rightLogin, setRightLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ul className="menubar">
      <li className="menu--logo">
        <Link to="/">광주 풋살</Link>
      </li>
      <li className="menu--info">
        <Link
          to="/"
          style={{ fontWeight: location.pathname === "/" ? "600" : "400" }}
        >
          구장 정보
        </Link>
      </li>
      <li className="menu--reserve">
        <Link
          to="reserve"
          style={{
            fontWeight: location.pathname === "/reserve" ? "600" : "400",
          }}
        >
          예약하기
        </Link>
      </li>

      {rightLogin ? (
        <div>
          <Link to="/mypage">
            <button className="mypage__btn">Mypage</button>
          </Link>
          <li
            className="login__btn"
            //TODO:router 예외처리시 삭제될 코드
            onClick={() => {
              navigate("/");
            }}
          >
            <button
              onClick={() => {
                setRightLogin(false);
              }}
            >
              로그아웃
            </button>
          </li>
        </div>
      ) : (
        <li className="login__btn">
          <Link to="login">
            <button>로그인</button>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MenuBar;
