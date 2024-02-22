import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Field from "../components/Field";
import { apiGet } from "../helper/api";
import "../css/pages/reservePage.css";

const ReservePage = () => {
  const location = useLocation();
  const stadiumId = location.state?.id;

  const [stadiumList, setStadiumList] = useState(null);
  const [stadiumValue, setStadiumValue] = useState(stadiumId ? stadiumId : 1);
  const [dateValue, setDateValue] = useState();
  const [fields, setFields] = useState(null);

  let hour = 0;
  let minute = 0;
  const times = ["00:00"];
  for (let i = 1; i <= 48; i++) {
    if (i % 2 === 0) {
      hour += 1;
      minute = 0;
    } else {
      minute += 30;
    }
    const time = `${`${hour}`.length === 1 ? `0${hour}` : hour}:${
      minute == 0 ? "00" : minute
    }`;
    times.push(time);
  }

  const [startTimeValue, setStartTimeValue] = useState(times[0]);
  const [endTimeValue, setEndTimeValue] = useState(times[0]);

  const settingStadiums = async () => {
    const data = await apiGet("stadiums");
    setStadiumList(data);
  };

  const settingDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i <= 30; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      dates.push(date);
    }
    return dates;
  };

  useEffect(() => {
    settingStadiums();
  }, []);

  const fetchField = async () => {
    const data = await apiGet(
      `stadiums/fields?id=${stadiumValue}&date=${dateValue}&time=${startTimeValue}:00`
    );
    setFields(data);
  };

  return (
    <>
      <div className="center">
        <div className="reserve_head">
          <div style={{ fontWeight: "700", marginRight: "20px" }}>
            예약 일정
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ fontSize: "30px", marginRight: "10px" }}
              className="material-symbols-outlined"
            >
              sports_soccer
            </span>
            <select
              style={{ fontSize: "16px" }}
              value={stadiumValue}
              onChange={(e) => setStadiumValue(e.target.value)}
            >
              {stadiumList?.map((stadium) => (
                <option key={stadium.id} value={stadium.id}>
                  {stadium.stadiumName}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ fontSize: "30px", marginRight: "10px" }}
              className="material-symbols-outlined"
            >
              calendar_month
            </span>
            <select
              style={{ fontSize: "16px" }}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            >
              {settingDates()?.map((date) => (
                <option key={date}>
                  {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                </option>
              ))}
            </select>
          </div>
          {/* TODO:날짜 조회 형식 바뀌면 바꾸기 */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ fontSize: "30px", marginRight: "10px" }}
              className="material-symbols-outlined"
            >
              history
            </span>
            <select
              onChange={(e) => {
                setStartTimeValue(e.target.value);
              }}
              value={startTimeValue}
              style={{ fontSize: "16px" }}
            >
              {times?.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </select>
            {/* <div style={{ margin: "10px", fontSize: "16px" }}>~</div>
            <select onChange={changeEndTimeValue} style={{ fontSize: "16px" }}>
              {times?.map((time) => (
                <option>{time}</option>
              ))}
            </select> */}
          </div>
          <button onClick={fetchField}>조회</button>
        </div>
        <hr />

        {fields?.map(
          (field) => field && <Field fetchField={fetchField} field={field} />
        )}
      </div>
    </>
  );
};
export default ReservePage;
