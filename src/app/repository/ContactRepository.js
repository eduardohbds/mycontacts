const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Jualdo',
    email: 'jualdolindo@cabasso.com',
    phone: '456789123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'johny',
    email: 'johnylindo@calasco.com',
    phone: '456789123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Joestar',
    email: 'Joestarlindo@cabasso.com',
    phone: '456789123',
    category_id: v4(),
  },
];
class ContactRepository {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve((contact) => contact.id === id);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve((contact) => contact.email === email);
    });
  }

  create({
    name,
    email,
    phone,
    category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name,
    email,
    phone,
    category_id,
  }) {
    return new Promise((resolve) => {
      const updateContact = {
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map(
        (contact) => (contact.id === id ? updateContact : contact),
      );

      resolve(updateContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
