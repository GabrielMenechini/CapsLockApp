const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { authRequired, adminOnly } = require('../utils/auth');

// público (cliente)
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

// protegido (admin)
router.post('/', authRequired, adminOnly, ctrl.create);
router.put('/:id', authRequired, adminOnly, ctrl.update);
router.delete('/:id', authRequired, adminOnly, ctrl.remove);

module.exports = router;
