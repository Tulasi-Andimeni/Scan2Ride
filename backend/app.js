// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const studentRoutes = require('./routes/studentRoutes');
// const cors = require('cors');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/students', studentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// // app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http"); // Required for Socket.IO
// const { Server } = require("socket.io"); // Socket.IO server class

// // Import your route files
// const scanRoute = require("./routes/scan");
// const attendanceRoute = require("./routes/attendanceRoute");
// const studentRoutes = require("./routes/studentRoutes"); // Assuming you have a studentRoutes file

// const app = express();
// const server = http.createServer(app); // Create an HTTP server using the Express app
// const io = new Server(server, {
//   cors: {
//     origin: "*", // IMPORTANT: For production, change this to your frontend's exact URL (e.g., "http://localhost:3000")
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods for CORS
//   },
// });

// // Middleware
// app.use(cors()); // Enable CORS for all incoming requests
// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// // MongoDB Connection
// const DB_URL = "mongodb://localhost:27017/scan2ride"; // Your MongoDB connection string

// mongoose.connect(DB_URL)
//   .then(() => {
//     console.log("MongoDB connected successfully");
//     // Start the server only after the database connection is established
//     server.listen(5000, () => {
//       console.log("Server running on http://localhost:5000");
//     });
//   })
//   .catch(err => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1); // Exit the process if DB connection fails
//   });

// // Socket.IO Connection Handling
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });

//   // You can add more socket event listeners here if needed for client-to-server communication
// });

// // Make the `io` instance accessible in your routes and controllers
// // This allows you to emit events from your backend logic
// app.set("io", io);

// // Use Routes
// // Prefix all routes from scanRoute with /api
// app.use("/api", scanRoute);
// // Prefix all routes from attendanceRoute with /api
// app.use("/api", attendanceRoute);
// // Prefix all routes from studentRoutes with /api/students
// app.use("/api/students", studentRoutes); // Assuming /api/students as the base path for student management

// // Basic error handling for undefined routes (404)
// app.use((req, res, next) => {
//   res.status(404).json({ message: "API endpoint not found" });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack); // 
//   res.status(500).json({ message: "Something broke! Internal Server Error" });
// });




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const http = require("http");
// const { Server } = require("socket.io");

// // Load environment variables
// dotenv.config();

// // Import Routes
// const scanRoute = require("./routes/scan");
// const attendanceRoute = require("./routes/attendanceRoute");
// const studentRoutes = require("./routes/studentRoutes");
// const driverRoutes = require('./routes/driverRoutes');



// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Update with your frontend URL in production
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("io", io); // Make io available in controllers

// // Connect to MongoDB Atlas (not local!)
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Atlas connected");
//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Socket.IO Events
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

// // Routes
// app.use("/api", scanRoute);
// // app.use("/api", attendanceRoute);
// app.use("/api/students", studentRoutes);
// app.use("/api/attendance", attendanceRoute);
// app.use('/api/drivers', driverRoutes);
// app.use('/uploads', express.static('uploads')); // make images public



// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ message: "API endpoint not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something broke! Internal Server Error" });
// });




// // const authRoutes = require("./routes/authRoutes");
// // app.use("/api/auth", authRoutes);


// // const protectedRoutes = require("./routes/protectedRoutes");
// // app.use("/api/protected", protectedRoutes);


// const authRoutes = require("./routes/authRoutes");

// app.use("/api/auth", authRoutes);

















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const http = require("http");
// const { Server } = require("socket.io");

// dotenv.config();

// const scanRoute = require("./routes/scan");
// const attendanceRoute = require("./routes/attendanceRoute");
// const studentRoutes = require("./routes/studentRoutes");
// const driverRoutes = require("./routes/driverRoutes");
// const authRoutes = require("./routes/authRoutes");
// const busRouter = require("./routes/busRouter");


// const app = express();
// const server = http.createServer(app);

// // Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Change to your frontend domain in production
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads")); // Serve uploaded images
// app.use("/api/bus-students", busRouter);

// app.set("io", io); // Make io available in routes/controllers

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Atlas connected");
//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // Socket.IO Events
// io.on("connection", (socket) => {
//   console.log(`🟢 Client connected: ${socket.id}`);
//   socket.on("disconnect", () => {
//     console.log(`🔴 Client disconnected: ${socket.id}`);
//   });
// });

// // API Routes
// // app.use("/api/scan", scanRoute);
// app.use("/api/student", scanRoute);


// app.use("/api/students", studentRoutes);
// app.use("/api/attendance", attendanceRoute);
// app.use("/api/drivers", driverRoutes);
// app.use('/api/auth', authRoutes);

// // 404 Not Found Handler
// app.use((req, res) => {
//   res.status(404).json({ message: "API endpoint not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("🔥 Error Message:", err.message);
//   console.error("📦 Stack Trace:", err.stack);
//   res.status(500).json({ message: "Something broke! Internal Server Error" });
// });






const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const scanRoute = require("./routes/scan");
const attendanceRoute = require("./routes/attendanceRoute");
const studentRoutes = require("./routes/studentRoutes");
const driverRoutes = require("./routes/driverRoutes");
const authRoutes = require("./routes/authRoutes");
// const busRouter = require("./routes/busRouter");

const app = express();
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Update to your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io); // ✅ Attach io instance to app so controllers can use it

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded driver images

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ✅ API Routes
app.use("/api/student", scanRoute);           // Scan student (POST /scan)
app.use("/api/students", studentRoutes);      // All student routes
app.use("/api/attendance", attendanceRoute);  // Attendance APIs
app.use("/api/drivers", driverRoutes);        // Driver APIs
app.use("/api/auth", authRoutes);             // Signup/Login
// app.use("/api/bus-students", busRouter);      // Bus to student mapping (if any)

// ✅ Socket.IO Events
io.on("connection", (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});
