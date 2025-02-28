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
  async update(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedElectronicBill = await electronicBillRepository.update(Number(id), updateData)
      if (!updatedElectronicBill) return res.status(404).json({ message: 'Electronic Bill not found' })
      res.json(updatedElectronicBill)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  async getByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const electronicBill = await electronicBillRepository.getByTaskId(taskId);
      if (!electronicBill) return res.status(404).json({ message: 'Electronic Bill not found' });
      res.json(electronicBill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ElectronicBillController()