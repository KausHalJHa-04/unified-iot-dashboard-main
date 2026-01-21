import CountUp from "react-countup";

const StatCard = ({ title, value, icon }) => {
  // Determine colors based on title
  const getCardStyle = (title) => {
    if (title.includes("Total")) {
      return {
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        accentColor: "text-blue-600",
        border: "border-l-4 border-blue-500"
      };
    } else if (title.includes("Online")) {
      return {
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        accentColor: "text-emerald-600",
        border: "border-l-4 border-emerald-500"
      };
    } else {
      return {
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        accentColor: "text-violet-600",
        border: "border-l-4 border-violet-500"
      };
    }
  };

  const style = getCardStyle(title);

  return (
    <div className={`group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${style.border}`}>
      
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider mb-1 sm:mb-2">
              {title}
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tabular-nums truncate">
              <CountUp end={value} duration={2} separator="," />
            </p>
          </div>

          {/* Icon container */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${style.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
            <svg className={`w-6 h-6 sm:w-7 sm:h-7 ${style.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {title.includes("Total") && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              )}
              {title.includes("Online") && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
              {title.includes("Live") && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              )}
            </svg>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Activity</span>
            <span className={`font-semibold ${style.accentColor}`}>Live</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${style.iconBg} rounded-full transition-all duration-1000 ease-out`} style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;