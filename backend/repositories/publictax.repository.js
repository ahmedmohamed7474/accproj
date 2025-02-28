const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class PublicTaxRepository {
  async create(data) {
    return prisma.publicTax.create({ data })
  }

  async getAll() {
    return prisma.publicTax.findMany()
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
      taxRegNo: parseInt(updateData.taxRegNo, 10),
      taxFileNo: parseInt(updateData.taxFileNo, 10),
      pass: parseInt(updateData.pass, 10)
    };

    return prisma.publicTax.update({
      where: { id: parseInt(id, 10) },
      data: processedData
    });
  }
  
  async getById(id) {
    return prisma.publicTax.findUnique({ where: { id: Number(id) } })
  }
  
  async getByTaskId(taskId) {
    return prisma.publicTax.findFirst({
      where: {
        taskId: parseInt(taskId, 10)
      }
    });
  }
}

module.exports = new PublicTaxRepository()