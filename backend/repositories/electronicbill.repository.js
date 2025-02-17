const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ElectronicBillRepository {
  async create(data) {
    return prisma.electronicBill.create({ data })
  }

  async getAll() {
    return prisma.electronicBill.findMany()
  }

  async getById(id) {
    return prisma.electronicBill.findUnique({ where: { id } })
  }
}

module.exports = new ElectronicBillRepository()