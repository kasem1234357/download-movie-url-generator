const { generateServer2 } = require('../controllers/tuktuk')

const router = require('express').Router()

router.get('/',generateServer2)
router.get('')
module.exports = router