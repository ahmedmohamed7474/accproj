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
  async update(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedCommercialRegister = await commercialRegisterRepository.update(Number(id), updateData)
      if (!updatedCommercialRegister) return res.status(404).json({ message: 'Commercial Register not found' })
      res.json(updatedCommercialRegister)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  async getByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const commercialRegister = await commercialRegisterRepository.getByTaskId(taskId);
      if (!commercialRegister) return res.status(404).json({ message: 'Commercial Register not found' });
      res.json(commercialRegister);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommercialRegisterController()