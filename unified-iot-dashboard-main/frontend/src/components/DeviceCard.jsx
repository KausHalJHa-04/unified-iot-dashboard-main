import { Link } from "react-router-dom";

const DeviceCard = ({ device }) => {
  const isOnline = device.status === "online";
  
  return (
    <Link to={`/devices/${device.deviceId}`} className="group block">
      <div className="relative bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-teal-500">
        
        {/* Subtle side accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isOnline ? 'bg-teal-500' : 'bg-amber-500'}`} />
        
        <div className="p-4 sm:p-5 pl-5 sm:pl-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 truncate mb-1">
                {device.deviceId}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {device.type}
              </p>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium flex-shrink-0 ${
              isOnline
                ? "bg-teal-50 text-teal-700"
                : "bg-amber-50 text-amber-700"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-teal-500' : 'bg-amber-500'}`} />
              {device.status}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 pt-3 border-t border-slate-100">
            <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
              {device.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DeviceCard;