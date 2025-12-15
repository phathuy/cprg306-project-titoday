// Three-dot loading component
export default function LoadingDots() {
  return (
    <div className="flex justify-center items-center py-10 space-x-2">
      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-75"></div>
      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-150"></div>
      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-300"></div>
    </div>
  );
}
