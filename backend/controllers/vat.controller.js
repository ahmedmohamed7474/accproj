const vatRepository = require('../repositories/vat.repository')

class VATController {
  async create(req, res) {
    try {
      const vatData = req.body
      const newVAT = await vatRepository.create(vatData)
      res.status(201).json(newVAT)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const vats = await vatRepository.getAll()
      res.json(vats)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const vat = await vatRepository.getById(Number(id))
      if (!vat) return res.status(404).json({ message: 'VAT not found' })
      res.json(vat)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new VATController()