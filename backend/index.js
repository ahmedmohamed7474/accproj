const express = require('express');
const cors = require('cors');
const { prisma } = require('./prisma/prisma.service.js');
//const { errorMiddleware } = require('./middlewares/error.middleware.js');
require('dotenv').config({ path: './.env' }); // Specify the path explicitly
console.log('Loaded environment variables:', process.env);

// Import routes
const companyRoutes = require('./routes/company.routes.js');
const employeeRoutes = require('./routes/employee.routes.js');
const roleRoutes = require('./routes/role.routes.js');
const vatRoutes = require('./routes/vat.routes.js');
const publicTaxRoutes = require('./routes/publictax.routes.js');
const electronicBillRoutes = require('./routes/electronicbill.routes.js');
const commercialRegisterRoutes = require('./routes/commericalregister.routes.js');
const taskRoutes = require('./routes/task.routes.js')
const otherRoutes = require('./routes/other.routes'); 

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/vat', vatRoutes);
app.use('/api/v1/public-tax', publicTaxRoutes);
app.use('/api/v1/electronic-bills', electronicBillRoutes);
app.use('/api/v1/commercial-registers', commercialRegisterRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use('/api/v1/other', otherRoutes);

// Error handling middleware
//app.use(errorMiddleware);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Prisma connection check

module.exports = { app, prisma };