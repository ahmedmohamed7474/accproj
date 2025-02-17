const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class VATRepository {
  async create(data) {
    return prisma.vAT.create({ data })
  }

  async getAll() {
    return prisma.vAT.findMany()
  }

  async getById(id) {
    return prisma.vAT.findUnique({ where: { id } })
  }
}

module.exports = new VATRepository()