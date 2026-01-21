import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import DeviceCard from "../components/DeviceCard";
import Loader from "../components/Loader";
import socket from "../services/socket";
import { motion } from "framer-motion";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await API.get("/devices");
      const data = Array.isArray(res.data) ? res.data : [];
      setDevices(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch devices", error);
      setDevices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDevices();
    };
    fetchData();

    // Listen for device status updates from MQTT
    const handleDeviceUpdate = (data) => {
      setDevices((prev) => {
        const updated = prev.map((device) =>
          device.deviceId === data.deviceId
            ? { ...device, status: "online", lastActive: new Date() }
            : device
        );
        // If device not found, add it
        if (!updated.find((d) => d.deviceId === data.deviceId)) {
          updated.unshift({
            deviceId: data.deviceId,
            name: data.deviceId,
            status: "online",
            lastActive: new Date(),
            type: "device"
          });
        }
        return updated;
      });
    };

    socket.on("telemetry-update", handleDeviceUpdate);

    return () => {
      socket.off("telemetry-update", handleDeviceUpdate);
    };
  }, []);

  // Filter devices based on search and status
  const filteredDevices = devices.filter((device) => {
    const deviceId = device.deviceId ? device.deviceId.toLowerCase() : "";
    const type = device.type ? device.type.toLowerCase() : "";
    const location = device.location ? device.location.toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      deviceId.includes(search) ||
      type.includes(search) ||
      location.includes(search);

    const matchesStatus =
      filterStatus === "all" || device.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const onlineCount = devices.filter((d) => d?.status === "online").length;
  const offlineCount = devices.filter((d) => d?.status === "offline").length;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={handleMenuClick} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Page header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Connected Devices
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Manage and monitor all your IoT devices
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">
                    Total Devices
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {devices.length}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-teal-200 p-4 sm:p-5 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">
                    Online
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-teal-600">
                    {onlineCount}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600"
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
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-amber-200 p-4 sm:p-5 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">
                    Offline
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {offlineCount}
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
              <button
                onClick={() => setFilterStatus("all")}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filterStatus === "all"
                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("online")}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filterStatus === "online"
                    ? "bg-emerald-500 text-white shadow-md transform scale-105"
                    : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setFilterStatus("offline")}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filterStatus === "offline"
                    ? "bg-amber-500 text-white shadow-md transform scale-105"
                    : "text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                Offline
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredDevices.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {devices.length}
              </span>{" "}
              devices
            </p>
          </div>

          {/* Device Grid */}
          {loading ? (
            <Loader />
          ) : filteredDevices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {filteredDevices.map((device, index) => (
                <motion.div
                  key={device._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <DeviceCard device={device} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                No devices found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 text-center max-w-md">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No devices are currently registered in the system"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devices;
