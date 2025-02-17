const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OtherRepository {
  async create(data) {
    return prisma.other.create({ data }); // Create a new "Other" record
  }

  async getAll() {
    return prisma.other.findMany(); // Get all "Other" records
  }

  async getById(id) {
    return prisma.other.findUnique({ where: { id } }); // Find a record by ID
  }
}

module.exports = new OtherRepository();