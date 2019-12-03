const express = require('express');
const {
    getAllHoles,
    getHoleById,
    addHoles,
    updateHole,
} = require('../controllers/drillholes');

const router = express.Router();
router.get('/', getAllHoles);
router.get('/:id', getHoleById);
router.post('/', addHoles);
router.put('/:id', updateHole);

module.exports = router;