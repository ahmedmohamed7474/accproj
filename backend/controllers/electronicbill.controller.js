const electronicBillRepository = require('../repositories/electronicbill.repository')

class ElectronicBillController {
  async create(req, res) {
    try {
      const electronicBillData = req.body
      const newElectronicBill = await electronicBillRepository.create(electronicBillData)
      res.status(201).json(newElectronicBill)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const electronicBills = await electronicBillRepository.getAll()
      res.json(electronicBills)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const electronicBill = await electronicBillRepository.getById(Number(id))
      if (!electronicBill) return res.status(404).json({ message: 'Electronic Bill not found' })
      res.json(electronicBill)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new ElectronicBillController()