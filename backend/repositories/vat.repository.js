const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class VATRepository {
  async create(data) {
    try {
      // تجاهل ID لأنه سيتم إنشاؤه تلقائياً
      const { id, createdAt, updatedAt, ...createData } = data;

      // تحويل الحقول الرقمية
      const processedData = {
        ...createData,
        empId: typeof createData.empId === 'string' ? parseInt(createData.empId, 10) : createData.empId,
        compId: typeof createData.compId === 'string' ? parseInt(createData.compId, 10) : createData.compId,
        taskId: typeof createData.taskId === 'string' ? parseInt(createData.taskId, 10) : createData.taskId,
        pass: typeof createData.pass === 'string' ? parseInt(createData.pass, 10) : createData.pass,
      };

      console.log('Processed data for creation:', processedData); // للتحقق من البيانات

      return prisma.VAT.create({
        data: processedData
      });
    } catch (error) {
      console.error('Error in VAT creation:', error);
      throw error;
    }
  }

  async getAll() {
    return prisma.vAT.findMany()
  }

  async getById(id) {
    return prisma.vAT.findUnique({ where: { id } })
  }
  async update(id, data) {
    try {
      // حذف الحقول التي لا يجب تحديثها
      const { id: _, createdAt, updatedAt, ...updateData } = data;

      // تحويل الحقول الرقمية
      const processedData = {
        ...updateData,
        empId: typeof updateData.empId === 'string' ? parseInt(updateData.empId, 10) : updateData.empId,
        compId: typeof updateData.compId === 'string' ? parseInt(updateData.compId, 10) : updateData.compId,
        taskId: typeof updateData.taskId === 'string' ? parseInt(updateData.taskId, 10) : updateData.taskId,
        pass: typeof updateData.pass === 'string' ? parseInt(updateData.pass, 10) : updateData.pass,
      };

      console.log('Processed data for update:', processedData); // للتحقق من البيانات

      return prisma.VAT.update({
        where: {
          id: typeof id === 'string' ? parseInt(id, 10) : id
        },
        data: processedData
      });
    } catch (error) {
      console.error('Error in VAT update:', error);
      throw error;
    }
  }
  async getByTaskId(taskId) {
    return prisma.vat.findFirst({
      where: {
        taskId: parseInt(taskId, 10)
      }
    });
  }
  async findByTaskId(taskId) {
    try {
      return await prisma.vAT.findFirst({
        where: {
          taskId: parseInt(taskId, 10)
        }
      });
    } catch (error) {
      console.error('Error in findByTaskId:', error);
      throw error;
    }
  }
}

module.exports = new VATRepository()