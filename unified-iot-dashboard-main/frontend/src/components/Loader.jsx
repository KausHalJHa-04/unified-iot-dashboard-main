const Loader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="relative bg-white rounded-lg border border-slate-200 overflow-hidden">
          {/* Side accent skeleton */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 animate-pulse" />
          
          <div className="p-4 sm:p-5 pl-5 sm:pl-6 space-y-3 sm:space-y-4">
            {/* Header skeleton */}
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-2 flex-1">
                <div className="h-4 sm:h-5 bg-slate-200 rounded w-2/3 animate-pulse" />
                <div className="h-3 sm:h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
              </div>
              <div className="h-6 sm:h-7 w-16 sm:w-20 bg-slate-200 rounded-md animate-pulse flex-shrink-0" />
            </div>

            {/* Location skeleton */}
            <div className="pt-3 border-t border-slate-100">
              <div className="h-3 sm:h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      ))}
    </div>
  );
};

export default Loader;