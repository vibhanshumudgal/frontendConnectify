const CardShimmer = () => {
  return (
    <div className="relative max-w-sm bg-white/40 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xl animate-pulse">
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-xl"></div>

      <div className="relative text-center">
        <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-11/12 mx-auto bg-gray-300 rounded mt-4 mb-2"></div>
        <div className="h-3 w-2/3 mx-auto bg-gray-300 rounded mb-4"></div>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default CardShimmer;
