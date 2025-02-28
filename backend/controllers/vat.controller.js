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
  async update(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedVAT = await vatRepository.update(Number(id), updateData)
      if (!updatedVAT) return res.status(404).json({ message: 'VAT not found' })
      res.json(updatedVAT)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  async getByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      // تغيير repository إلى vatRepository
      const result = await vatRepository.findByTaskId(taskId);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'VAT record not found for this task'
        });
      }

      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error in getByTaskId:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

}

module.exports = new VATController()