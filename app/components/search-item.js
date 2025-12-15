import Link from "next/link";
import React from "react";

// Component rendering a search result item.
export default function SearchItem({ meal }) {
  return (
    <Link
      href={`/recipe/${meal.idMeal}`}
      className="block hover:bg-gray-800/50 transition-colors duration-150"
    >
      <div className="py-3 border-b border-gray-800 last:border-b-0 px-2">
        <h3 className="text-xl font-semibold text-white">{meal.strMeal}</h3>
      </div>
    </Link>
  );
}
