import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ReviewModal = ({ order, onSubmitReview, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [writtenReview, setWrittenReview] = useState('');
  const [showReviewField, setShowReviewField] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
    setShowReviewField(true);
  };

  const handleSubmit = () => {
    onSubmitReview({ rating, writtenReview });
    onClose();
  };

  const renderStarIcon = (starIndex) => {
    const currentRating = hoverRating || rating;

    if (currentRating >= starIndex) {
      return (
        <FaStar className="text-yellow-500 text-5xl transition duration-300 ease-in-out transform hover:scale-110" />
      );
    } else if (currentRating >= starIndex - 0.5) {
      return (
        <FaStarHalfAlt className="text-yellow-500 text-5xl transition duration-300 ease-in-out transform hover:scale-110" />
      );
    } else {
      return (
        <FaRegStar className="text-gray-400 text-5xl transition duration-300 ease-in-out transform hover:scale-110" />
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm transition-opacity duration-700 ease-in-out h-a">
      <div
        className={`bg-white p-4 rounded-[50px] shadow-lg w-auto max-w-3xl transition-all duration-700 ease-in-out ${
          showReviewField ? 'h-auto' : 'h-full'
        }`}
      >
        <div className="bg-customSideBar rounded-[30px] shadow-lg p-4 mb-2">
          <h2 className="text-4xl font-bold text-center mb-2">Ohodnoďte objednávku!</h2>
          <p className="text-center text-lg mb-2 text-gray-600">
            A pomôžte zlepšovať služby našich poskytovateľov!
          </p>
        </div>

        {/* Sekcia obrázkov Pred a Po */}
        <div
          className={`flex flex-col justify-center items-center transition-all duration-700 ease-in-out overflow-hidden ${
            showReviewField ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
          } mb-4`}
        >
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <p className="font-bold mb-2">Pred:</p>
              <img
                src={order.beforeImage}
                alt="Pred"
                className="w-40 h-auto object-cover rounded-lg"
              />
            </div>
            <div className="text-center">
              <p className="font-bold mb-2">Po:</p>
              <img
                src={order.afterImage}
                alt="Po"
                className="w-40 h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Hodnotenie pomocou hviezdičiek */}
        <div className="flex justify-center mb-3 bg-purple-100 rounded-[30px] shadow-lg p-4 transition-transform duration-500 ease-in-out">
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <div
              key={starIndex}
              className="relative"
              style={{ display: 'inline-block', position: 'relative' }}
            >
              {renderStarIcon(starIndex)}
              <button
                onClick={() => handleRatingClick(starIndex - 0.5)}
                onMouseEnter={() => setHoverRating(starIndex - 0.5)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '50%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              ></button>
              <button
                onClick={() => handleRatingClick(starIndex)}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  width: '50%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              ></button>
            </div>
          ))}
        </div>

        {/* Písomná recenzia (zobrazená po kliknutí na hviezdičky) */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            showReviewField ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
          } mb-2`}
        >
          {showReviewField && (
            <div>
              <label className="block text-center font-medium mb-4">
                Zadajte písomnú recenziu:
              </label>
              <textarea
                value={writtenReview}
                onChange={(e) => setWrittenReview(e.target.value)}
                className="w-full p-4 border rounded-lg"
                rows={4}
                placeholder="Napíšte svoju skúsenosť..."
              />
            </div>
          )}
        </div>

        {/* Tlačidlá pre zrušenie alebo odoslanie */}
        <div className="flex justify-center space-x-8 mt-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-[30px] hover:bg-gray-400 transition duration-300"
          >
            Zrušiť
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-400 text-white px-6 py-2 rounded-[30px] hover:bg-purple-700 transition duration-300"
            disabled={!rating}
          >
            Odoslať
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
