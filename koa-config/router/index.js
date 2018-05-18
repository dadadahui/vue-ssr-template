const router = require('koa-router')()
const recommend = require('./recommend')
router.get('/api', recommend.routes())

module.exports = router
