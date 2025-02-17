const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class PublicTaxRepository {
  async create(data) {
    return prisma.publicTax.create({ data })
  }

  async getAll() {
    return prisma.publicTax.findMany()
  }

  async getById(id) {
    return prisma.publicTax.findUnique({ where: { id } })
  }
}

module.exports = new PublicTaxRepository()