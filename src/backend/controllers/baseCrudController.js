class BaseCrudController {
  constructor(repository) {
    if (!repository) {
      throw new Error('Repository is required for BaseCrudController');
    }
    this.repository = repository;
  }

  async getList(req, res) {
      try {
        const records = await this.repository.getAll();
        return res.status(200).json(records);
      } catch (error) {
        console.error('Error fetching records:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  
  async getById(req, res, recordData = null) {
    const { id } = recordData || req.params;
    try {
      const record = await this.repository.getById(id);
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      } else {
        return res.status(200).json(record);
      }
    } catch (error) {
      console.error('Error fetching record:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async create(req, res, recordData = null) {
    try {
      const newRecord = await this.repository.create(recordData || req.body);
      return res.status(201).json(newRecord);
    } catch (error) {
      console.error('Error creating record:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async update(req, res, recordData = null) {
    const { id } = recordData || req.params;
    try {
      const [updatedRows] = await this.repository.update(id, req.body);
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Record not found' });
      } else {
        return res.status(200).json({ message: 'Record updated successfully' });
      }
    } catch (error) {
      console.error('Error updating record:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async delete(req, res, recordData = null) {
    const { id } = recordData || req.params;
    try {
      const deletedRowCount = await this.repository.delete(id);
      if (deletedRowCount === 0) {
        return res.status(404).json({ error: 'Record not found' });
      } else {
        return res.status(204).json();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}
  
  module.exports = BaseCrudController;
  