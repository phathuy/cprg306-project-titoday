"use client";

import { useState, useEffect, useCallback } from "react";
import {
  searchMealsByName,
  filterByCategory,
  getCategories,
} from "./api/api-fetching";

import Header from "./components/header";
import RandomMealsSection from "./components/random-meals";
import SearchSection from "./components/search-area";

// Home page
export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchMeals, setSearchMeals] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Load category list
  useEffect(() => {
    async function loadCategories() {
      const cats = await getCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // Handle changes for search input
  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
    setCategory("");
  }, []);

  // Handle changes for category select
  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
    setQuery("");
  }, []);

  // Perform search based on query or category
  const performSearch = async (e) => {
    e.preventDefault();
    if (!query && !category) return;

    setSearching(true);
    setLoadingSearch(true);

    let results = [];
    if (query) results = await searchMealsByName(query);
    else if (category) results = await filterByCategory(category);

    setSearchMeals(results || []);
    setLoadingSearch(false);
  };

  // Clear search inputs, category selection and results
  const clearSearch = () => {
    setQuery("");
    setCategory("");
    setSearchMeals([]);
    setSearching(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-5 py-10">
      <div className="max-w-7xl mx-auto">
        <Header />

        <RandomMealsSection />

        <SearchSection
          query={query}
          category={category}
          categories={categories}
          searchMeals={searchMeals}
          searching={searching}
          loadingSearch={loadingSearch}
          performSearch={performSearch}
          clearSearch={clearSearch}
          handleQueryChange={handleQueryChange}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </main>
  );
}
