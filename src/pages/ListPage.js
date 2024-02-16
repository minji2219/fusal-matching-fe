import React, { useEffect, useState } from "react";
import InfoList from "../components/InfoList";
import "../css/pages/ListPage.css";
import { apiGet } from "../helper/api";

const ListPage = () => {
  const [stadiums, setStadiums] = useState(null);
  const fetchStadiums = async () => {
    const data = await apiGet("stadiums");
    setStadiums(data);
  };
  useEffect(() => {
    fetchStadiums();
  }, []);

  return (
    <div className="center">
      <div>구장의 자세한 정보가 궁금하다면? click !</div>
      {stadiums?.map((stadium) => (
        <InfoList
          key={stadium.id}
          images={stadium.images}
          norest={stadium.norest}
          parking={stadium.parking}
          shower={stadium.shower}
          id={stadium.id}
          name={stadium.stadiumName}
          time={stadium.time}
          phone={stadium.tel}
          address={stadium.address}
          price={stadium.cost}
        />
      ))}
    </div>
  );
};

export default ListPage;
