const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CompanyRepository {
    async create(data) {
        try {
            const company = await prisma.company.create({
                data: {
                    name: data.name,
                    phonenum: data.phonenum,
                    
                }
            });
            return company;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const companies = await prisma.company.findMany({
                include: {
                    
                    vats: true,
                    publicTaxes: true,
                    electronicBills: true,
                    commercialRegisters: true
                }
            });
            return companies;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const company = await prisma.company.findUnique({
                where: { id },
                include: {
                    
                    vats: true,
                    publicTaxes: true,
                    electronicBills: true,
                    commercialRegisters: true
                }
            });
            return company;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const company = await prisma.company.update({
                where: { id },
                data: {
                    name: data.name,
                    phonenum: data.phonenum,
                    
                }
            });
            return company;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await prisma.company.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CompanyRepository;