const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.get("/contacts/:id", ContactController.delete);

module.exports = router;
