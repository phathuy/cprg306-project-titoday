import Image from "next/image";
import Link from "next/link";

// MealCard component to render a meal info with image, name, category, nationality.
export default function MealCard({ meal }) {
  return (
    <Link href={`/recipe/${meal.idMeal}`} className="block group">
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl
                 transition-colors duration-300 ease-in-out 
                 group-hover:border-amber-600/50 group-hover:shadow-amber-900/50"
      >
        <Image
          src={`${meal.strMealThumb}/medium`}
          alt={meal.strMeal}
          width={600}
          height={400}
          className="w-full h-40 object-cover"
          placeholder="empty"
          loading="lazy"
        />

        <div className="p-4">
          <h3 className="text-xl font-bold text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
            {meal.strMeal}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {meal.strCategory} • {meal.strArea}
          </p>
        </div>
      </div>
    </Link>
  );
}
