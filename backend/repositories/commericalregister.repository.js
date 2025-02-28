const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class CommercialRegisterRepository {
  async create(data) {
    return prisma.commercialRegister.create({ data })
  }

  async getAll() {
    return prisma.commercialRegister.findMany()
  }

  async getById(id) {
    return prisma.commercialRegister.findUnique({ where: { id } })
  }
  async update(id, data) {
    return prisma.commercialRegister.update({
      where: { id },
      data
    })
  }
  async getByTaskId(taskId) {
    return prisma.commercialRegister.findFirst({
      where: {
        taskId: parseInt(taskId, 10)
      }
    });
  }
}

module.exports = new CommercialRegisterRepository()