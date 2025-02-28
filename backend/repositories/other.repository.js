const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OtherRepository {
  async create(data) {
    try {
      // Ignore ID since it will be automatically generated
      const { id, createdAt, updatedAt, ...createData } = data;

      // Convert numeric fields if they're passed as strings
      const processedData = {
        ...createData,
        // Add any specific numeric fields that need conversion here
        // For example, if 'Other' has similar fields to VAT:
        empId: typeof createData.empId === 'string' ? parseInt(createData.empId, 10) : createData.empId,
        compId: typeof createData.compId === 'string' ? parseInt(createData.compId, 10) : createData.compId,
        taskId: typeof createData.taskId === 'string' ? parseInt(createData.taskId, 10) : createData.taskId,
        // Add other numeric fields as needed
      };

      console.log('Processed data for creation:', processedData); // For data verification

      return prisma.other.create({
        data: processedData
      });
    } catch (error) {
      console.error('Error in Other creation:', error);
      throw error;
    }
  }

  async getAll() {
    return prisma.other.findMany(); // Get all "Other" records
  }

  async getById(id) {
    return prisma.other.findUnique({ where: { id } }); // Find a record by ID
  }
  
  async update(id, data) {
    return prisma.other.update({
      where: { id },
      data
    }); // Update a record
  }
  
  async getByTaskId(taskId) {
    return prisma.other.findFirst({
      where: {
        taskId: parseInt(taskId, 10)
      }
    });
  }
}

module.exports = new OtherRepository();