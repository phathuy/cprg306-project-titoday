"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchRandomMeal } from "../api/api-fetching";
import MealCard from "./meal-card";
import LoadingDots from "./loading-dots";

// Component displaying 6 random meals.
export default function RandomMealsSection() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load 6 random meals
  const loadRandomMeals = useCallback(async () => {
    setLoading(true);

    // Fetch 6 random meals
    const promises = Array(6)
      .fill(null)
      .map(() => fetchRandomMeal());

    const results = await Promise.all(promises);
    setMeals(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadRandomMeals();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadRandomMeals]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
        <h2 className="text-3xl font-bold text-amber-400">
          Today&apos;s Picks
        </h2>

        <button
          onClick={loadRandomMeals}
          className="text-lg font-semibold text-amber-400 hover:text-amber-300 px-3 py-1 rounded border border-amber-400 hover:border-amber-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "New Picks"}
        </button>
      </div>

      {loading && meals.length === 0 ? (
        <LoadingDots />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
