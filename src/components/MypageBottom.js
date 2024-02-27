import React, { useContext, useState } from "react";
import { FutureBDContext } from "../context/FutureBreakDownContext";
import "../css/components/MypageBottom.css";
import { apiPost } from "../helper/api";

const RadioPoint = ({ handlePoint }) => {
  return (
    <div>
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "25px", height: "25px" }}
        value={1}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "20px", height: "20px" }}
        value={2}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "17px", height: "17px" }}
        value={3}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "15px", height: "15px" }}
        value={4}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "17px", height: "17px" }}
        value={5}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "20px", height: "20px" }}
        value={6}
        onChange={(e) => handlePoint(e.target.value)}
      />
      <input
        type="radio"
        name="point"
        className="input__radio"
        style={{ width: "25px", height: "25px" }}
        value={7}
        onChange={(e) => handlePoint(e.target.value)}
      />
    </div>
  );
};
const MypageBottom = () => {
  const {
    futureBD,
    setFutureBD,
    BDtitle,
    matchingId,
    oppositeTeam,
    stadium,
    evalOpposite,
    evalStadium,
  } = useContext(FutureBDContext);
  const [stadiumReview, setStadiumReview] = useState();
  const [manner, setManner] = useState();
  const [skill, setSkill] = useState();

  const writeStadiumReview = async () => {
    const postData = {
      teamMatchingId: matchingId,
      gpa: 1,
      review: stadiumReview,
    };
    await apiPost("review/write-stadium", postData);
  };

  const writeTeamReview = async () => {
    const postData = {
      teamMatchingId: matchingId,
      oppositeTeamId: oppositeTeam,
      manner: Number(manner),
      skill: Number(skill),
    };
    await apiPost("review/write-team", postData);
  };

  return (
    <>
      {futureBD ? (
        <div className="mypage__toggle">
          <div
            className="toggle__btn"
            onClick={() => {
              setFutureBD(false);
            }}
          ></div>

          <div className="toggle__content">
            <div className="stadium__review">
              <div className="review__head">
                <span className="review__mark">구장 리뷰</span>
                <span style={{ fontWeight: "700" }}>{BDtitle}</span>
              </div>
              <div className="stadium__review--writer">
                <textarea
                  value={stadiumReview}
                  placeholder="리뷰를 작성해 주세요."
                  onChange={(e) => {
                    setStadiumReview(e.target.value);
                  }}
                />
                <button className="review__btn" onClick={writeStadiumReview}>
                  등록
                </button>
              </div>
            </div>

            <div className="team__review">
              <div className="review__head">
                <span className="review__mark">팀 리뷰</span>
                <span style={{ fontWeight: "700" }}>{BDtitle}</span>
              </div>

              <div className="team__review--content">
                <div>
                  <div className="skill__point">
                    <div className="skill__check">
                      <span className="skill__title">🏆 실력 </span>
                      <RadioPoint handlePoint={setSkill} />
                    </div>
                    <div className="skill__point--ment">
                      <div>훈련이 필요해보여요 !</div>
                      <div>좋아요 !</div>
                      <div style={{ marginLeft: "20px" }}>
                        와우, 프로인가요?
                      </div>
                    </div>
                  </div>

                  <div className="manner__point">
                    <div className="manner__check">
                      <span className="manner__title">⭐ 매너 </span>
                      <RadioPoint handlePoint={setManner} />
                    </div>
                    <div className="manner__point--ment">
                      <div>매너가 아주 꽝 !</div>
                      <div>좋아요 !</div>
                      <div>최고의 매너예요!</div>
                    </div>
                  </div>
                </div>
                <button className="review__btn" onClick={writeTeamReview}>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mypage__copyright">
          <div className="mutual">
            <span className="copyright__title">상호명</span>
            <span>
              (주) JNU산공이공 | 기획자 : 이은경 | FE : 서민지 | BE : 신지훈
            </span>
          </div>
          <div className="address">
            <span className="copyright__title">주소: </span>
            <span>광주 북구 용봉로 77, 자동차공학관(공과대학 1호관)</span>
          </div>
          <div className="support">
            <span className="copyright__title">고객지원: </span>
            <span>이메일 (luk0992@naver.com )</span>
          </div>
          <div className="copyright">Copyright © JNU산공이공</div>
        </div>
      )}
    </>
  );
};

export default MypageBottom;
