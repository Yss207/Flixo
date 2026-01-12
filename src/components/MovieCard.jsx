import React from "react";
import { IMG_CDN_URL } from "../utils/constants"; // Assuming you have this constant

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    // FIX: Added 'w-48' (fixed width) and 'pr-4' (gap between cards)
    <div className="w-48 pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
