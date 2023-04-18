const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const result = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return result;
  }

  async findById(id) {
    const [result] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result;
  }

  async findByName(name) {
    const [result] = await db.query('SELECT * FROM contacts WHERE name = $1', [name]);
    return result;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name)
      VALUES($1)
      RETURNING *
      `, [name]);
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1
      WHERE id = $2
      RETURNING *
      `, [name, id]);
    return row;
  }

  delete(id) {
    const deleteOp = db.query(`DELETE FROM contacts WHERE id = $1`, [id]);
    return deleteOp;
  }
}

module.exports = new ContactRepository();
