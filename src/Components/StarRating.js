import React from 'react';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;

    return (
        <div className="flex">
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;

                return (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill={
                            starValue <= roundedRating
                                ? 'currentColor' // Full star
                                : starValue - 0.5 === roundedRating
                                ? 'url(#halfGradient)' // Half star
                                : 'none' // Empty star
                        }
                        stroke={starValue <= roundedRating || starValue - 0.5 === roundedRating ? 'none' : 'currentColor'}
                        strokeWidth="2"
                    >
                        <defs>
                            <linearGradient id="halfGradient">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                );
            })}
        </div>
    );
};

export default StarRating;
