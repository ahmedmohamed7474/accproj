const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ElectronicBillRepository {
  async create(data) {
    // حذف حقل ID لأنه سيتم إنشاؤه تلقائياً
    const { id, ...createData } = data;

    // تحويل الحقول الرقمية
    const processedData = {
      ...createData,
      empId: parseInt(createData.empId, 10),
      compId: parseInt(createData.compId, 10),
      taskId: parseInt(createData.taskId, 10),
      pass: parseInt(createData.pass, 10)
    };

    return prisma.electronicBill.create({
      data: processedData
    });
  }

  async getAll() {
    return prisma.electronicBill.findMany()
  }

  async getById(id) {
    return prisma.electronicBill.findUnique({ where: { id } })
  }
  async update(id, data) {
    // حذف الحقول التي لا يجب تحديثها
    const { id: _, createdAt, updatedAt, ...updateData } = data;

    // تحويل الحقول الرقمية
    const processedData = {
      ...updateData,
      empId: parseInt(updateData.empId, 10),
      compId: parseInt(updateData.compId, 10),
      taskId: parseInt(updateData.taskId, 10),
      pass: parseInt(updateData.pass, 10)
    };

    return prisma.electronicBill.update({
      where: { id: parseInt(id, 10) },
      data: processedData
    });
  }
  async getByTaskId(taskId) {
    return prisma.electronicBill.findFirst({
      where: {
        taskId: parseInt(taskId, 10)
      }
    });
  }
}

module.exports = new ElectronicBillRepository()