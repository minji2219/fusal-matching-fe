import "../css/components/Review.css";

const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="review__nickname">{review.writer}:</div>
      <div className="review__emoji">😎</div>
      <div className="review__content">{review.review}</div>
    </div>
  );
};

export default Review;
