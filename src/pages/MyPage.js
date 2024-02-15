import React, { useContext, useEffect, useState } from "react";
import "../css/pages/MyPage.css";
import NowBreakdown from "../components/NowBreakdown";
import FutureBreakdown from "../components/FutureBreakdown";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { changeText } from "../helper/ChangeText";
import profile from "../image/ball.png";
import { FutureBDContext } from "../context/FutureBreakDownContext";
import MypageBottom from "../components/MypageBottom";

const MyPage = () => {
  const { accessToken, idData } = useContext(UserContext);
  const [team, setTeam] = useState();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const { futureBD, BDtitle } = useContext(FutureBDContext);

  const teamFetch = async () => {
    try {
      const result = await axios.get(
        `https://6f2b-121-147-100-85.ngrok-free.app/teams?id=${idData}`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setTeam(result.data);
    } catch (err) {
      console.log("err입니당~", err);
    }
  };
  useEffect(() => {
    teamFetch();
  }, []);

  console.log(team);

  return (
    <>
      <div className="center">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <div className="mypage_top">
          <div className="mypage_top_left">
            <div className="icon">
              <span className="material-symbols-outlined">lock</span>{" "}
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div className="introduce">
              <div className="profile">
                <img
                  src={team?.imageUrl ? team?.imageUrl : profile}
                  style={{ width: "110px", height: "110px", margin: "15px" }}
                  alt="profile"
                />
              </div>
              <ul style={{ display: "block" }}>
                <li style={{ marginBottom: "5px" }}>
                  <span style={{ display: "inline-block", width: "70px" }}>
                    팀명
                  </span>
                  <span style={{ color: "#adadad80" }}>| </span>
                  <span>{team?.teamName}</span>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <span style={{ display: "inline-block", width: "70px" }}>
                    주장
                  </span>
                  <span style={{ color: "#adadad80" }}>| </span>
                  <span>{team?.captainName}</span>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <span style={{ display: "inline-block", width: "70px" }}>
                    전화번호
                  </span>
                  <span style={{ color: "#adadad80" }}>| </span>
                  <span>{team?.tel}</span>
                </li>
                <li style={{ marginBottom: "5px" }}>
                  <span style={{ display: "inline-block", width: "70px" }}>
                    실력
                  </span>
                  <span style={{ color: "#adadad80" }}>| </span>
                  <span>{changeText(Number(team?.skill))}</span>
                </li>
                <li style={{ marginBottom: "3px" }}>
                  <span style={{ display: "inline-block", width: "70px" }}>
                    매너
                  </span>
                  <span style={{ color: "#adadad80" }}>| </span>
                  <span>{changeText(Number(team?.manner))}</span>
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                alignItem: "center",
                fontSize: "1.2rem",
              }}
            >
              <span className="material-symbols-outlined">rewarded_ads</span>
              <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                {" "}
                수상 경력
              </span>
            </div>
            <hr />
            <ul className="mypage_list">
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
              <li>2019년도 '오로라' 풋살 대회 준우승</li>
            </ul>
          </div>

          <div className="margin_top_right">
            <div className="now_breakdown">
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  fontSize: "1.2rem",
                }}
              >
                <span class="material-symbols-outlined">
                  indeterminate_check_box
                </span>
                <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                  {" "}
                  현재 매칭 내역
                </span>
              </div>
              <hr />
              <ul className="nowbreakdown_list">
                {team?.matchingRecordList.map((matchingRecord) => {
                  matchingRecord = matchingRecord.matchingRecord;
                  let matYear = matchingRecord?.matchingDate?.slice(0, 4);
                  let matMonth = matchingRecord?.matchingDate?.slice(5, 7);
                  let matDay = matchingRecord?.matchingDate?.slice(8, 10);
                  if (Number(matYear) < year) {
                    //현재 보다 matching년도가 전일때
                  } else if (Number(matYear) === year) {
                    //->현재보다 matching월이 전일 때
                    if (Number(matMonth) < month) {
                      //->현재와 matching월이 같을 때
                    } else if (Number(matMonth) === month) {
                      //-->>현재보다 matching day가 전일 때
                      if (Number(matDay) < day) {
                      } else {
                        return (
                          <NowBreakdown
                            date={matchingRecord?.matchingDate}
                            stadium={matchingRecord?.stadiumName}
                            fieldNum={matchingRecord?.fieldNum}
                            allRental={matchingRecord?.allRental}
                            myteam={matchingRecord?.myTeamDto}
                            oppositeTeam={matchingRecord?.oppositeTeamDto}
                            startTime={matchingRecord?.startTime}
                            endTime={matchingRecord?.endTime}
                            teamId={team?.id}
                            matchingId={matchingRecord?.matchingId}
                            teamFetch={teamFetch}
                          />
                        );
                      }
                    }
                    //->현재보다 matching월이 빠를 때
                    else {
                      return (
                        <NowBreakdown
                          date={matchingRecord?.matchingDate}
                          stadium={matchingRecord?.stadiumName}
                          fieldNum={matchingRecord?.fieldNum}
                          allRental={matchingRecord?.allRental}
                          myteam={matchingRecord?.myTeamDto}
                          oppositeTeam={matchingRecord?.oppositeTeamDto}
                          startTime={matchingRecord?.startTime}
                          endTime={matchingRecord?.endTime}
                          teamId={team?.id}
                          matchingId={matchingRecord?.matchingId}
                          teamFetch={teamFetch}
                        />
                      );
                    }
                  }
                  //현재보다 mathing 년도가 빠를 때
                  else {
                    return (
                      <NowBreakdown
                        date={matchingRecord?.matchingDate}
                        stadium={matchingRecord?.stadiumName}
                        fieldNum={matchingRecord?.fieldNum}
                        allRental={matchingRecord?.allRental}
                        myteam={matchingRecord?.myTeamDto}
                        oppositeTeam={matchingRecord?.oppositeTeamDto}
                        startTime={matchingRecord?.startTime}
                        endTime={matchingRecord?.endTime}
                        teamId={team?.id}
                        matchingId={matchingRecord?.matchingId}
                        teamFetch={teamFetch}
                      />
                    );
                  }
                })}
              </ul>
            </div>

            <div className="future_breakdown">
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  fontSize: "1.2rem",
                }}
              >
                <span class="material-symbols-outlined">select_check_box</span>
                <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                  {" "}
                  지난 매칭 내역
                </span>
              </div>
              <hr />
              <ul className="futurebreakdown_list">
                {team?.matchingRecordList.map((matchingRecord) => {
                  matchingRecord = matchingRecord.matchingRecord;
                  let matYear = matchingRecord?.matchingDate?.slice(0, 4);
                  let matMonth = matchingRecord?.matchingDate?.slice(5, 7);
                  let matDay = matchingRecord?.matchingDate?.slice(8, 10);

                  //현재 보다 matching년도가 전일때
                  if (Number(matYear) < year) {
                    return (
                      <FutureBreakdown
                        date={matchingRecord?.matchingDate}
                        stadiumName={matchingRecord?.stadiumName}
                        stadiumId={matchingRecord?.stadiumId}
                        fieldNum={matchingRecord?.fieldNum}
                        allRental={matchingRecord?.allRental}
                        myteam={matchingRecord?.myTeamDto}
                        oppositeTeam={matchingRecord?.oppositeTeamDto}
                        startTime={matchingRecord?.startTime}
                        endTime={matchingRecord?.endTime}
                      />
                    );
                  }

                  //현재랑 matching년도가 같을 때
                  else if (Number(matYear) === year) {
                    //->현재보다 matching월이 전일 때
                    if (Number(matMonth) < month) {
                      return (
                        <FutureBreakdown
                          date={matchingRecord?.matchingDate}
                          stadiumName={matchingRecord?.stadiumName}
                          stadiumId={matchingRecord?.stadiumId}
                          fieldNum={matchingRecord?.fieldNum}
                          allRental={matchingRecord?.allRental}
                          myteam={matchingRecord?.myTeamDto}
                          oppositeTeam={matchingRecord?.oppositeTeamDto}
                          startTime={matchingRecord?.startTime}
                          endTime={matchingRecord?.endTime}
                        />
                      );
                      //->현재와 matching월이 같을 때
                    } else if (Number(matMonth) === month) {
                      //-->>현재보다 matching day가 전일 때
                      if (Number(matDay) < day) {
                        return (
                          <FutureBreakdown
                            date={matchingRecord?.matchingDate}
                            stadiumName={matchingRecord?.stadiumName}
                            stadiumId={matchingRecord?.stadiumId}
                            fieldNum={matchingRecord?.fieldNum}
                            allRental={matchingRecord?.allRental}
                            myteam={matchingRecord?.myTeamDto}
                            oppositeTeam={matchingRecord?.oppositeTeamDto}
                            startTime={matchingRecord?.startTime}
                            endTime={matchingRecord?.endTime}
                          />
                        );
                      }
                    }
                    //->현재보다 matching월이 빠를 때
                    else {
                    }
                  }
                  //현재보다 mathing 년도가 빠를 때
                  else {
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MypageBottom />
    </>
  );
};

export default MyPage;
