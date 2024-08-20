const {  generateServer1,  getEpsoide  } = require('../controllers/akwam')

const router = require('express').Router()

router.get('/',generateServer1)
router.get('/tv/',getEpsoide)
router.get('/list',)
module.exports = router
