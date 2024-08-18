const {  generateServer1 } = require('../controllers/akwam')

const router = require('express').Router()

router.get('/',generateServer1)
router.get('/list',)
module.exports = router