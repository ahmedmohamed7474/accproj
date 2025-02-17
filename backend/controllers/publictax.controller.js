const publicTaxRepository = require('../repositories/publictax.repository')

class PublicTaxController {
  async create(req, res) {
    try {
      const publicTaxData = req.body
      const newPublicTax = await publicTaxRepository.create(publicTaxData)
      res.status(201).json(newPublicTax)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAll(req, res) {
    try {
      const publicTaxes = await publicTaxRepository.getAll()
      res.json(publicTaxes)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const publicTax = await publicTaxRepository.getById(Number(id))
      if (!publicTax) return res.status(404).json({ message: 'Public Tax not found' })
      res.json(publicTax)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = new PublicTaxController()