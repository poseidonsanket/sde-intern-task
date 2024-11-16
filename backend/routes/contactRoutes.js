const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to get all contacts
router.get('/getContacts', contactController.getContacts);

// Route to add a new contact
router.post('/addContact', contactController.addContact);

// Route to update an existing contact
router.put('/updateContact/:id', contactController.updateContact);

// Route to delete a contact
router.delete('/deleteContact/:id', contactController.deleteContact);

module.exports = router;
