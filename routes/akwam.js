const {  generateServer1,  getEpsoide,download  } = require('../controllers/akwam')

const router = require('express').Router()

router.get('/',generateServer1)
router.get('/tv/',getEpsoide)
router.get('/download',download)
module.exports = router
