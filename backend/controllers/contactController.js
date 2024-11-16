const pool = require('../config/db');

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new contact
exports.addContact = async (req, res) => {
  const { first_name, last_name, email, phone, company, job_title } = req.body;
  
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (first_name, last_name, email, phone, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, email, phone, company, job_title]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, company, job_title } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, job_title = $6 WHERE id = $7 RETURNING *',
      [first_name, last_name, email, phone, company, job_title, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.status(204).send("Contact Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
