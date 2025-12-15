"use client";

import { useState, useEffect } from "react";
import SearchItem from "./search-item";
import LoadingDots from "./loading-dots";

const INITIAL_LOAD_COUNT = 10;
const INCREMENT_COUNT = 10;

// Component for the search area.
export default function SearchSection({
  query,
  category,
  categories,
  searchMeals,
  searching,
  loadingSearch,
  performSearch,
  clearSearch,
  handleQueryChange,
  handleCategoryChange,
}) {
  // State variable to manage number of results currently visible
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  // Reset to 10 visible results for new search
  useEffect(() => {
    const t = setTimeout(() => {
      setVisibleCount(INITIAL_LOAD_COUNT);
    }, 0);
    return () => clearTimeout(t);
  }, [searchMeals]);

  // Conditions the Clear button should be clickable
  const isClearable = query || category || searching;

  // The meals to be shown
  const mealsToShow = searchMeals.slice(0, visibleCount);

  // "Load More" button appears only if there are more meals to show
  const showLoadMore = searchMeals.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + INCREMENT_COUNT);
  };

  return (
    <>
      {/* Search bar */}
      <section className="mb-12">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <form
            onSubmit={performSearch}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-[4fr_1fr_1fr_1fr]"
          >
            {/* Input text field */}
            <input
              value={query}
              onChange={handleQueryChange}
              placeholder="Search by meal name..."
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500
                         focus:outline-none focus:border-amber-500"
            />

            {/* Category list */}
            <div className="relative flex items-center">
              {/* Bootstrap icon for category list */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-list text-gray-400 absolute left-3 pointer-events-none z-10"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>

              <select
                value={category}
                onChange={handleCategoryChange}
                className="bg-gray-800 border border-gray-700 rounded-lg pr-4 py-3 appearance-none text-gray-100
                 focus:outline-none focus:border-amber-500
                 pl-10"
              >
                <option value="" className="text-gray-500">
                  Category
                </option>

                {categories.map((c) => (
                  <option key={c.strCategory} value={c.strCategory}>
                    {c.strCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              {/* Bootstrap search icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>

              <span>Search</span>
            </button>

            {/* Clear Button */}
            <button
              type="button"
              onClick={isClearable ? clearSearch : undefined}
              disabled={!isClearable}
              className={`text-white font-semibold py-3 rounded-lg ${
                isClearable
                  ? "bg-red-800 hover:bg-red-700"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Clear
            </button>
          </form>
        </div>
      </section>

      {/* Search results */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-amber-400">
          Search Results
          {searching && searchMeals.length > 0 && (
            <span className="font-normal text-gray-500 ml-4">
              ({searchMeals.length} found)
            </span>
          )}
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 min-h-[400px]">
          {loadingSearch ? (
            <LoadingDots />
          ) : !searching ? (
            <p className="text-xl text-gray-500 text-center py-20">
              Start your search and pick a meal!
            </p>
          ) : searchMeals.length === 0 ? (
            <p className="text-xl text-gray-500 text-center py-20">
              No recipes found for your query.
            </p>
          ) : (
            <>
              {/* Display only the limited number of meals */}
              <div className="divide-y divide-gray-800">
                {mealsToShow.map((meal) => (
                  <SearchItem key={meal.idMeal} meal={meal} />
                ))}
              </div>

              {/* Load More Button */}
              {showLoadMore && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="bg-gray-800 hover:bg-gray-700 text-amber-400 font-semibold px-6 py-3 rounded-lg"
                  >
                    Show More ({searchMeals.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
