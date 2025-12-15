import Link from "next/link";

// Header component displaying page title and icons.
export default function Header() {
  return (
    <div>
      <Link href="/" className="block mb-8">
        <h1 className="text-center text-5xl mb-12 flex items-center justify-center space-x-4 text-gray-100">
          <span className="text-7xl leading-none">🍴</span>
          <span className="text-amber-400 font-bold">TasteIt Today!</span>
          <span className="text-7xl leading-none">🥄</span>
        </h1>
      </Link>
    </div>
  );
}
