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
  const [editDisabled, setEditDisabled] = useState(true);
  const [saveBtnDisplay, setSaveBtnDisplay] = useState("hidden");
  const [postImg, setPostImg] = useState();
  const [previewImage, setPreviewImage] = useState();

  const teamFetch = async () => {
    const data = await apiGet(`teams?id=${userId}`);
    setTeam(data);
  };
  useEffect(() => {
    teamFetch();
  }, []);
  const handleEdit = () => {
    setEditDisabled(false);
    setSaveBtnDisplay("visible");
  };
  const handleUpdate = () => {
    //TODO:데이터 수정 서버 생성시 API 연결
    setEditDisabled(true);
    setSaveBtnDisplay("hidden");
  };
  const uploadFile = (e) => {
    let file = e.target?.files[0];
    setPostImg(file);
    let fileRead = new FileReader();
    fileRead.onload = () => {
      setPreviewImage(fileRead.result);
    };
    fileRead.readAsDataURL(file);
  };
  return (
    <div className="mypage__whole">
      <div className="center mypage">
        <div className="mypage__teaminfo">
          <div className="mypage__icons">
            <span
              className="mypage__icon material-symbols-outlined"
              style={{ visibility: saveBtnDisplay }}
              onClick={handleUpdate}
            >
              save
            </span>
            <span
              className="mypage__icon material-symbols-outlined"
              onClick={handleEdit}
            >
              edit
            </span>
          </div>
          <div className="mypage__teamintro">
            <div className="team__profile">
              {editDisabled ? (
                <img
                  src={team?.imageUrl ? team.imageUrl : profile}
                  width={100}
                  height={100}
                  alt="profile"
                />
              ) : (
                <div className="profile">
                  {previewImage ? (
                    <img
                      alt={previewImage}
                      src={previewImage}
                      width={80}
                      height={80}
                    />
                  ) : (
                    <label htmlFor="input-file" className="profile__upload">
                      <span className="material-symbols-outlined">upload</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id="input-file"
                    accept="image/*"
                    onChange={uploadFile}
                  />
                </div>
              )}
            </div>
            <div className="team__contents">
              <div className="team__content">
                <div className="team__key">팀명</div>
                <input
                  className="team__value"
                  placeholder={team?.teamName}
                  disabled={editDisabled}
                />
              </div>
              <div className="team__content">
                <div className="team__key">주장</div>
                <input
                  className="team__value"
                  placeholder={team?.captainName}
                  disabled={editDisabled}
                />
              </div>
              <div className="team__content">
                <div className="team__key">전화번호</div>
                <input
                  className="team__value"
                  placeholder={team?.tel}
                  disabled={editDisabled}
                />
              </div>
              <div className="team__content">
                <div className="team__key">실력</div>
                <input
                  className="team__value"
                  placeholder={changeText(team?.skill)}
                  disabled
                />
              </div>
              <div className="team__content">
                <div className="team__key">매너</div>
                <input
                  className="team__value"
                  placeholder={changeText(team?.manner)}
                  disabled
                />
              </div>
            </div>
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
