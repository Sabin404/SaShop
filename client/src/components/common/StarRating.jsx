import React from 'react';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';

const StarRating = ({ rating = 0,handleRatingChange }) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <Button
            key={star}
            variant="ghost"
            className={`
              group
              relative
              rounded-full
              p-4
              transition-all
              duration-300
              transform
              scale-100
              hover:scale-125
              hover:rotate-6
              border-2
              border-transparent
              ${isActive
                ? 'text-yellow-400 bg-yellow-100 shadow-lg'
                : 'text-gray-500 bg-white hover:bg-yellow-50 hover:text-yellow-400'}
            `}
            onClick={handleRatingChange ? ()=>handleRatingChange (star) :null}
          >
            <StarIcon
              className={`
                h-8 w-8 transition-colors duration-200
                ${isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-500'}
              `}
            />
            {/* Optional Sparkle */}
            {isActive && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-yellow-400 rounded-full animate-ping" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default StarRating;
