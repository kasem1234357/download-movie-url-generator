const { generateServer3 } = require('../controllers/wecima')

const router = require('express').Router()

router.get('/',generateServer3)
router.get('')
module.exports = router