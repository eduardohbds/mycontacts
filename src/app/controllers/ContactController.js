const ContactRepository = require("../repository/ContactRepository");

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);
    response.send(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const emailAlreadyExist = await ContactRepository.findByEmail();

    if (emailAlreadyExist) {
      return response.status(400).json({ error: 'Email already have been taken' });
    }
    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });
    response.json(contact);
  }

  async update(request, response) {
    const {
      id,
    } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;
    const doExistId = await ContactController.findById(id);
    if (doExistId) {
      return response.status(400).json({ error: 'Contact does not exist' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const emailAlreadyExist = await ContactRepository.findByEmail();

    if (emailAlreadyExist) {
      return response.status(400).json({ error: 'Email already have been aken' });
    }
    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}
module.exports = new ContactController();
