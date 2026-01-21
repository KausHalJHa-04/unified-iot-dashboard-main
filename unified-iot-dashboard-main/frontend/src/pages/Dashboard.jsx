import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import socket from "../services/socket";
import API from "../services/api";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Fetch devices on load
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await API.get("/devices");
        setDevices(res.data);
        setLoading(false);
      } catch {
        console.error("Failed to fetch devices");
        setLoading(false);
      }
    };

    fetchDevices();

    // Socket listener
    const handleTelemetryUpdate = (data) => {
      setTelemetry((prev) => [data, ...prev.slice(0, 8)]);
    };

    socket.on("telemetry-update", handleTelemetryUpdate);

    return () => {
      socket.off("telemetry-update", handleTelemetryUpdate);
    };
  }, []);

  const onlineDevices = Array.isArray(devices)
    ? devices.filter((device) => device.status === "online").length
    : 0;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAV */}
        <Navbar onMenuClick={handleMenuClick} />

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Page header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Dashboard Overview
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Monitor your IOT infrastructure in real-time
            </p>
          </div>

          {/* SYSTEM STATUS BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-6 sm:p-8 shadow-xl text-white"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-indigo-100 font-medium mb-0.5">
                    System Status
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    All services running normally
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                <span className="text-sm font-semibold text-white">
                  Live System
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-2xl -ml-24 -mb-24" />
          </motion.div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard
                title="Total Devices"
                value={Array.isArray(devices) ? devices.length : 0}
                icon="devices"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard
                title="Online Devices"
                value={onlineDevices}
                icon="online"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard
                title="Live Events"
                value={telemetry.length}
                icon="events"
              />
            </motion.div>
          </div>

          {/* LIVE FEED SECTION */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                Live Telemetry Stream
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Real-time data from connected devices
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full w-fit shadow-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <span className="text-xs font-bold text-amber-700 tracking-wide">
                STREAMING
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-36 sm:h-40 bg-white rounded-xl border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {Array.isArray(telemetry) && telemetry.length > 0 ? (
                telemetry.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Side accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 group-hover:w-2 transition-all" />

                    <div className="p-4 sm:p-5 pl-5 sm:pl-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse flex-shrink-0" />
                          <p className="font-bold text-sm sm:text-base text-slate-900 truncate">
                            {item.deviceId}
                          </p>
                        </div>
                        <span className="px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 animate-pulse flex-shrink-0 border border-amber-100">
                          LIVE
                        </span>
                      </div>

                      {/* Metric */}
                      <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">
                        {item.metric}
                      </p>

                      {/* Value */}
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                          {typeof item.value === "object"
                            ? `${item.value.lat.toFixed(5)}, ${item.value.lng.toFixed(5)}`
                            : item.value}
                        </p>

                        <span className="text-base sm:text-lg text-slate-500">
                          {item.unit}
                        </span>
                      </div>

                      {/* Timestamp indicator */}
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Just now</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                    No telemetry data yet
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 text-center max-w-md">
                    Waiting for devices to send telemetry updates. Data will
                    appear here in real-time.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
