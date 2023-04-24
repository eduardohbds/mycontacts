const CategoryRepository = require("../repository/CategoryRepository");

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    response.json(await CategoryRepository.findAll(orderBy));
  }

  show() {

  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name });
    response.json(category);
  }

  update() {

  }

  delete() {

  }
}
module.exports = new CategoryController();
