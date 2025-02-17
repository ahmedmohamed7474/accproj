class CompanyController {
  constructor(companyRepository) {
      this.companyRepository = companyRepository;
  }

  async createCompany(req, res) {
      try {
          const company = await this.companyRepository.create(req.body);
          res.status(201).json(company);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  }

  async getAllCompanies(req, res) {
      try {
          const companies = await this.companyRepository.findAll();
          res.status(200).json(companies);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async getCompanyById(req, res) {
      try {
          const company = await this.companyRepository.findById(parseInt(req.params.id));
          if (!company) {
              return res.status(404).json({ message: 'Company not found' });
          }
          res.status(200).json(company);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async updateCompany(req, res) {
      try {
          const company = await this.companyRepository.update(parseInt(req.params.id), req.body);
          if (!company) {
              return res.status(404).json({ message: 'Company not found' });
          }
          res.status(200).json(company);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  }

  async deleteCompany(req, res) {
      try {
          await this.companyRepository.delete(parseInt(req.params.id));
          res.status(204).send();
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }
}

module.exports = CompanyController;