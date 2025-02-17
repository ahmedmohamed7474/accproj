const express = require("express");
const cors = require("cors");

const vatRoutes = require("./routes/vat.routes"); // VAT routes
const employeeRoutes = require("./routes/employees.routes"); // Employee routes
const taskRoutes = require("./routes/task.routes"); // Task routes

const app = express();

// ✅ Middleware
app.use(cors()); // Prevent CORS issues
app.use(express.json()); // Parse JSON requests

// ✅ Debugging middleware (logs all requests)
app.use((req, res, next) => {
  console.log(`📢 Received request: ${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/vat", vatRoutes);
app.use("/api/v1/employees", employeeRoutes);


// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});
console.log("✅ All registered routes:", 
  app._router.stack
    .filter(r => r.route)
    .map(r => ({
      path: r.route.path,
      methods: Object.keys(r.route.methods)
    }))
);

// ✅ Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
