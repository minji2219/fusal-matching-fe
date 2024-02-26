import React from "react";
import "../css/components/MenuBar.css";
import { Link, useLocation } from "react-router-dom";

const MenuBar = () => {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    window.location.replace("/");
  };

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

      {accessToken ? (
        <div>
          <Link to="/mypage">
            <button className="mypage__btn">Mypage</button>
          </Link>
          <li className="menu--login__btn">
            <button onClick={logout}>로그아웃</button>
          </li>
        </div>
      ) : (
        <li className="menu--login__btn">
          <Link to="login">
            <button>로그인</button>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MenuBar;
