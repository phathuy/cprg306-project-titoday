import { fetchMealById } from "../../api/api-fetching";
import Image from "next/image";
import Header from "../../components/header";

// Recipe page displaying ingredients and cooking instructions.
export default async function RecipePage({ params }) {
  const { id } = await params;

  const meal = await fetchMealById(id);

  // Ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]?.trim()) {
      ingredients.push(
        `${meal[`strMeasure${i}`] || ""} ${meal[`strIngredient${i}`]}`.trim()
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
          {/* Meal image and name */}
          <div className="relative">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={1600}
              height={700}
              className="w-full h-80 sm:h-96 object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-end p-8 sm:p-12">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                {meal.strMeal}
              </h1>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            {/* Category . Nationality */}
            <p className="text-xl text-gray-500 mb-8 font-medium border-b border-gray-800 pb-4">
              {meal.strCategory} • {meal.strArea}
            </p>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Ingredients Column */}
              <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
                <h2 className="text-3xl font-extrabold text-amber-400 mb-6 flex items-center">
                  Ingredients List
                </h2>

                <ul className="space-y-4">
                  {ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-start text-lg text-gray-300"
                    >
                      <span className="text-amber-500 text-2xl font-black flex-shrink-0 mr-3">
                        •
                      </span>
                      <span className="font-medium">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cooking Instructions */}
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-extrabold text-gray-200 mb-8 pb-3 border-b border-amber-500">
                  Cooking Instructions
                </h2>

                <ol className="space-y-8">
                  {meal.strInstructions
                    .split("\r\n")
                    .filter((step) => step.trim() !== "")
                    .map((step, index) => (
                      <li key={index} className="flex items-start">
                        <p className="text-lg text-gray-300 leading-relaxed pt-1">
                          {step.trim()}
                        </p>
                      </li>
                    ))}
                </ol>

                {/* Link to YouTube video */}
                {meal.strYoutube && (
                  <div className="mt-12 pt-6 border-t border-gray-800">
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      className="inline-flex items-center bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
