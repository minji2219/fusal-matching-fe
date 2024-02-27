import React, { useEffect, useState } from "react";
import "../css/pages/MyPage.css";
import { changeText } from "../helper/ChangeText";
import profile from "../image/ball.png";
import MypageBottom from "../components/MypageBottom";
import { apiGet } from "../helper/api";
import MatchingHistory from "../components/MatchingHistory";

const MyPage = () => {
  const userId = localStorage.getItem("userId");
  const [team, setTeam] = useState();

  const teamFetch = async () => {
    const data = await apiGet(`teams?id=${userId}`);
    setTeam(data);
  };
  useEffect(() => {
    teamFetch();
  }, []);

  return (
    <div>
      <div className="center mypage">
        <div className="mypage__teaminfo">
          <div className="mypage__icons">
            <span className="material-symbols-outlined">lock</span>{" "}
            <span className="material-symbols-outlined">edit</span>
          </div>
          <div className="mypage__teamintro">
            <div className="team__profile">
              <img
                src={team?.imageUrl ? team.imageUrl : profile}
                style={{ width: "100px", height: "100px" }}
                alt="profile"
              />
            </div>
            <div className="team__contents">
              <div className="team__content">
                <span className="team__key">팀명</span>
                {team?.teamName}
              </div>
              <div className="team__content">
                <span className="team__key">주장</span>
                {team?.captainName}
              </div>
              <div className="team__content">
                <span className="team__key">전화번호</span>
                {team?.tel}
              </div>
              <div className="team__content">
                <span className="team__key">실력</span>
                {changeText(team?.skill)}
              </div>
              <div className="team__content">
                <span className="team__key">매너</span>
                {changeText(team?.manner)}{" "}
              </div>
            </div>
          </div>
          <div className="team__awards">
            <div className="mypage__icon">
              <span className="material-symbols-outlined">rewarded_ads</span>
              수상 경력
            </div>
            <hr />
            {/* TODO:경력 데이터 받아오기 */}
            <ul className="team__awards__list">
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
            </ul>
          </div>
        </div>
        <MatchingHistory
          matchingRecords={team?.matchingRecordList}
          teamFetch={teamFetch}
        />
      </div>
      <MypageBottom />
    </div>
  );
};

export default MyPage;
