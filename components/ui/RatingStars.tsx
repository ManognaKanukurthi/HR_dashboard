"use client";

import { Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { cn, getRatingColor } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onRatingChange,
  className,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;
  const colorClass = getRatingColor(displayRating);

  return (
    <div 
      className={cn("flex items-center", className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isActive = 
          hoverRating !== null 
            ? index < hoverRating 
            : index < fullStars || (index === fullStars && hasHalfStar);
        
        return (
          <div 
            key={index}
            className={cn(
              "cursor-default transition-colors", 
              interactive && "cursor-pointer",
              isActive ? colorClass : "text-gray-300"
            )}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {index < fullStars || (hoverRating !== null && index < hoverRating) ? (
              <Star size={size} fill="currentColor" />
            ) : index === fullStars && hasHalfStar && hoverRating === null ? (
              <StarHalf size={size} fill="currentColor" />
            ) : (
              <Star size={size} />
            )}
          </div>
        );
      })}
    </div>
  );
}