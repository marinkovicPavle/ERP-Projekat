import Rater from 'react-rater';

function createMarkup(content) {
  return {__html: content};
}

function checkRating(rating) {
    switch (rating) {
        case 'Excelent':
            return 5;

        case 'Very Good':
            return 4;

        case 'Good':
            return 3;

        case 'Ok':
            return 2;

        case 'Bad':
            return 1;
    
        default:
            break;
    }
  }

const ReviewsList = ({ reviews }) => {
 console.log(reviews)
  return (
    <section className="reviews-list">
      {reviews.map(review => (
        <div className="review-item">

          
          <div className="review__content">
            <h3>{ review.rating }</h3>
            <Rater total={checkRating(review.rating)} interactive={false} rating={review.punctuation} />
            <div className="review__comment" dangerouslySetInnerHTML={createMarkup(review.review)}>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
  
export default ReviewsList;
    