# Unified IoT Dashboard

A comprehensive IoT monitoring and management dashboard that enables real-time device tracking, telemetry data visualization, and device control through an intuitive web interface.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18%2B-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Features

- **Real-Time Device Monitoring**: Track device status and metrics in real-time
- **Telemetry Data Visualization**: Display device telemetry data with charts and statistics
- **Device Management**: Add, update, and manage IoT devices
- **WebSocket Support**: Live data updates using Socket.io
- **MQTT Integration**: Publish/subscribe to MQTT topics for device communication
- **Responsive Dashboard**: Modern, responsive UI built with React and Tailwind CSS
- **Authentication**: Protected routes for secure access
- **Device Details**: Comprehensive device information and historical data
- **Simulator**: Built-in MQTT simulator for testing and development

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Message Protocol**: MQTT
- **Environment Management**: dotenv

### Frontend
- **Framework**: React (v18+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Real-Time**: Socket.io Client
- **Routing**: React Router

### DevOps
- **Container**: Docker (optional)
- **Deployment**: Vercel (Frontend)

## 📥 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd unified-iot-dashboard
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/iot-dashboard
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/iot-dashboard

# MQTT Configuration
MQTT_BROKER_URL=mqtt://localhost:1883
# MQTT_BROKER_URL=mqtt://broker.hivemq.com:1883


# Socket.io Configuration
SOCKET_PORT=5000
SOCKET_CORS=http://localhost:5173

# API Configuration
API_BASE_URL=http://localhost:5000
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000

# Environment
VITE_ENV=development
```

### MQTT Simulator Configuration

Create a `.env` file in the `mqtt-simulator` directory with the following variables:

```env
# MQTT Broker Configuration
MQTT_BROKER_URL=mqtt://localhost:1883
```

## 📁 Project Structure

```
unified-iot-dashboard/
├── backend/                          # Node.js backend server
│   ├── config/                       # Configuration files
│   │   └── db.js                    # Database connection setup
│   ├── controllers/                  # Business logic controllers
│   │   ├── deviceController.js      # Device management logic
│   │   └── telemetryController.js   # Telemetry data logic
│   ├── models/                       # Database models/schemas
│   │   ├── Device.js                # Device schema
│   │   └── Telemetry.js             # Telemetry schema
│   ├── mqtt/                         # MQTT integration
│   │   └── subscriber.js            # MQTT subscriber setup
│   ├── routes/                       # API routes
│   │   ├── deviceRoutes.js          # Device endpoints
│   │   └── telemetryRoutes.js       # Telemetry endpoints
│   ├── socket/                       # WebSocket configuration
│   │   └── socketHandler.js         # Socket.io handlers
│   ├── publisher.js                  # MQTT publisher utility
│   ├── server.js                     # Main server file
│   └── package.json                  # Backend dependencies
│
├── frontend/                         # React frontend application
│   ├── src/
│   │   ├── assets/                  # Static assets
│   │   ├── components/              # Reusable components
│   │   │   ├── DeviceCard.jsx       # Device card component
│   │   │   ├── Loader.jsx           # Loading spinner component
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   ├── ProtectedRoute.jsx   # Route protection
│   │   │   ├── Sidebar.jsx          # Sidebar navigation
│   │   │   └── StatCard.jsx         # Statistics display
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Main dashboard page
│   │   │   ├── DeviceDetails.jsx    # Device details page
│   │   │   └── Devices.jsx          # Devices list page
│   │   ├── services/                # API and service layer
│   │   │   ├── api.js               # Axios API instance
│   │   │   └── socket.js            # Socket.io setup
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/                       # Static files
│   ├── eslint.config.js             # ESLint configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── vite.config.js               # Vite configuration
│   ├── vercel.json                  # Vercel deployment config
│   ├── package.json                 # Frontend dependencies
│   └── index.html                   # HTML entry point
│
├── mqtt-simulator/                   # MQTT testing simulator
│   ├── publisher.js                 # Publishes simulated IoT data
│   └── package.json                 # Simulator dependencies
│
└── Readme.md                         # This file
```

## 🚀 Running the Application

### Development Mode

#### Start MQTT Broker (Optional)

If using local Mosquitto:

```bash
mosquitto -v
```

#### Start Backend Server and Start MQTT Simulator

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server 

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

The simulator will start publishing mock IoT data to your MQTT broker.

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

## 📡 API Documentation

### Device Endpoints

#### Get All Devices
```
GET /api/devices
Response: Array of device objects
```

#### Get Device by ID
```
GET /api/devices/:id
Response: Device object with details
```

### Telemetry Endpoints

#### Get Telemetry Data
```
GET /api/telemetry
Query Parameters:
  - deviceId: Filter by device ID
  - startDate: Start date for date range
  - endDate: End date for date range
Response: Array of telemetry records
```

#### Get Device Telemetry
```
GET /api/telemetry/:deviceId
Response: Latest telemetry data for device
```

#### Create Telemetry Record
```
POST /api/telemetry
Body: {
  "deviceId": "device_id",
  "temperature": 25.5,
  "humidity": 60,
  "data": {}
}
Response: Created telemetry record
```

## 💡 Usage Guide

### Viewing Device Details

1. Go to the **Devices** page
2. Click on any device card
3. View real-time telemetry data and device status

### Monitoring Dashboard

1. The **Dashboard** page shows:
   - Total active devices
   - Real-time data updates
   - Device status overview
   - Telemetry statistics

### Using WebSocket for Real-Time Updates

Real-time data is automatically pushed via Socket.io. No manual configuration needed—the frontend automatically connects and listens for updates.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's code style and includes appropriate comments.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review existing GitHub issues
3. Create a new issue with detailed information
4. Include your environment details (Node version, OS, etc.)

---


For more information, visit the [GitHub Repository](https://github.com/gautamaggarwaldev/unified-iot-dashboard)
