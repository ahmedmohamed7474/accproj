const otherRepository = require('../repositories/other.repository');

class OtherController {
  async create(req, res) {
    try {
      const otherData = req.body; // Get data from the request body
      const newOther = await otherRepository.create(otherData); // Create a new "Other" record
      res.status(201).json(newOther); // Return the created record
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  }

  async getAll(req, res) {
    try {
      const others = await otherRepository.getAll(); // Get all "Other" records
      res.json(others); // Return the records
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const other = await otherRepository.getById(Number(id)); // Find the record by ID
      if (!other) return res.status(404).json({ message: 'Other record not found' }); // Handle not found
      res.json(other); // Return the record
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const updateData = req.body; // Get update data from the request body
      const updatedOther = await otherRepository.update(Number(id), updateData); // Update the record
      if (!updatedOther) return res.status(404).json({ message: 'Other record not found' }); // Handle not found
      res.json(updatedOther); // Return the updated record
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
    }
  }
  async getByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const other = await otherRepository.getByTaskId(taskId);
      if (!other) return res.status(404).json({ message: 'Other record not found' });
      res.json(other);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OtherController();