import "../css/components/StadiumCard.css";
import futsal from "../image/풋살장.jpg";

const StadiumCard = () => {
  return (
    <div
      className="stadium__card--mini"
      style={{ backgroundImage: `url(${futsal})` }}
    >
      <div className="stadium__card__content">
        <div className="stadium__name">오렌지 풋살</div>
        <div className="stadium__card__btns">
          <button>예약관리</button>
          <button>정보수정</button>
        </div>
      </div>
    </div>
  );
};

export default StadiumCard;
