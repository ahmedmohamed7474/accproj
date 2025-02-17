const commercialRegisterRepository = require('../repositories/commericalregister.repository')

class CommercialRegisterController {
  async create(req, res) {
    try {
      const commercialRegisterData = req.body
      const newCommercialRegister = await commercialRegisterRepository.create(commercialRegisterData)
      res.status(201).json(newCommercialRegister)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const commercialRegisters = await commercialRegisterRepository.getAll()
      res.json(commercialRegisters)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const commercialRegister = await commercialRegisterRepository.getById(Number(id))
      if (!commercialRegister) return res.status(404).json({ message: 'Commercial Register not found' })
      res.json(commercialRegister)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new CommercialRegisterController()