import { useContext } from "react";
import "../css/components/MatchingHistory.css";
import { apiPost } from "../helper/api";
import { FutureBDContext } from "../context/FutureBreakDownContext";
const MatchingList = ({ matching }) => {
  return (
    <span>
      <span className="matching__list--item">{matching.matchingDate}</span>
      <span className="matching__list--item">
        {matching.stadiumName} - {matching.fieldNum}구장
      </span>
      <span className="matching__list--item">
        {matching.allRental ? (
          `[ 전체 대여 ]`
        ) : (
          <>
            [ vs
            {matching.oppositeTeamDto ? (
              matching.oppositeTeamDto.teamName
            ) : (
              <span>❓ </span>
            )}
            ]
          </>
        )}
      </span>
      <span className="matching__list--item">
        {matching.startTime.slice(0, 5)} ~ {matching.endTime.slice(0, 5)}
      </span>
    </span>
  );
};
const MatchingHistory = ({ matchingRecords, teamFetch }) => {
  const userId = localStorage.getItem("userId");
  const {
    setBDTitle,
    setFutureBD,
    setMatchingId,
    setOppositeTeam,
    setStadium,
    setEvalOpposite,
    setEvalStadium,
  } = useContext(FutureBDContext);
  let nowMatchingRecord = [];
  let futureMatchingRecord = [];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  matchingRecords?.map((matching) => {
    const matchingYear = Number(
      matching?.matchingRecord.matchingDate?.slice(0, 4)
    );
    const matchingMonth = Number(
      matching?.matchingRecord.matchingDate?.slice(5, 7)
    );
    const matchingDay = Number(
      matching?.matchingRecord.matchingDate?.slice(8, 10)
    );

    if (matchingYear > year) {
      nowMatchingRecord?.push(matching.matchingRecord);
    } else if (matchingYear === year) {
      if (matchingMonth > month) {
        nowMatchingRecord?.push(matching.matchingRecord);
      } else if (matchingMonth === month) {
        if (matchingDay > day) {
          nowMatchingRecord?.push(matching.matchingRecord);
        } else futureMatchingRecord?.push(matching.matchingRecord);
      } else {
        futureMatchingRecord?.push(matching.matchingRecord);
      }
    } else {
      futureMatchingRecord?.push(matching.matchingRecord);
    }
  });
  const cancelMatching = async (matchingId) => {
    if (window.confirm("취소 하시겠습니까?")) {
      const postData = {
        teamId: userId,
        matchingId: matchingId,
      };
      await apiPost("matching/cancel", postData);
      teamFetch();
    }
  };
  return (
    <div>
      <div className="mypage__icon">
        <span className="material-symbols-outlined">
          indeterminate_check_box
        </span>
        현재 매칭 내역
      </div>
      <hr />
      <ul className="now-matching">
        {nowMatchingRecord.map((matching) => (
          <li className="matching__list" key={matching.matchingId}>
            <MatchingList matching={matching} />
            <button className="waiting__btn">대기 중</button>
            <button
              className="cancel__btn"
              onClick={() => cancelMatching(matching.matchingId)}
            >
              취소
            </button>
          </li>
        ))}
      </ul>

      <div className="mypage__icon">
        <span className="material-symbols-outlined">select_check_box</span>
        지난 매칭 내역
      </div>
      <hr />
      <ul className="future-matching">
        {futureMatchingRecord.map((matching) => (
          <li className="matching__list" key={matching.matchingId}>
            <MatchingList matching={matching} />
            {matching.myTeamDto.evalOpposite ||
            matching.myTeamDto.evalStadium ? (
              <button
                className="review--read__btn"
                onClick={() => setFutureBD(true)}
              >
                리뷰 보기
              </button>
            ) : (
              <button
                className="review--write__btn"
                onClick={() => setFutureBD(true)}
              >
                리뷰 달기
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingHistory;
