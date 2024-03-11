import { useContext } from "react";
import "../css/components/MatchingHistory.css";
import { apiPost } from "../helper/api";
import { PastHistoryContext } from "../context/PastHistoryContext";

export const MatchingList = ({ matching }) => {
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
    setPastHistory,
    setMatchingId,
    setOppositeTeamId,
    setOppositeTeamEvalState,
    setStadiumEvalState,
  } = useContext(PastHistoryContext);
  let nowMatchingRecord = [];
  let pastMatchingRecord = [];

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
        } else pastMatchingRecord?.push(matching.matchingRecord);
      } else {
        pastMatchingRecord?.push(matching.matchingRecord);
      }
    } else {
      pastMatchingRecord?.push(matching.matchingRecord);
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
  const handleReviewBtn = (matching) => {
    // console.log(matching);
    setPastHistory(true);
    setMatchingId(matching.matchingId);
    setOppositeTeamId(matching.oppositeTeamDto?.id);
    setOppositeTeamEvalState(matching.myTeamDto?.evalOpposite);
    setStadiumEvalState(matching.myTeamDto?.evalStadium);
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
      <ul className="past-matching">
        {pastMatchingRecord.map((matching) => (
          <li className="matching__list" key={matching.matchingId}>
            <MatchingList matching={matching} />
            {!(
              matching.myTeamDto.evalOpposite && matching.myTeamDto.evalStadium
            ) && (
              <button
                className="review--write__btn"
                onClick={() => handleReviewBtn(matching)}
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
