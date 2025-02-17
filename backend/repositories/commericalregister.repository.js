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
}

module.exports = new CommercialRegisterRepository()