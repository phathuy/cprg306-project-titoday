// Fetch a random meal
export async function fetchRandomMeal() {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  const data = await result.json();
  return data.meals[0];
}

// Fetch meal by ID
export async function fetchMealById(id) {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await result.json();
  return data.meals[0];
}

// Fetch meals by name search
export async function searchMealsByName(name) {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await result.json();
  return data.meals || [];
}

// Fetch meals by category filter
export async function filterByCategory(category) {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await result.json();
  return data.meals || [];
}

// Fetch meal categories
export async function getCategories() {
  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await result.json();
  return data.categories;
}
