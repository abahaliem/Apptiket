const express = require('express')
const router = express()
const {create,
       indexEvents,
       destroyEvents,
       find,
     } = require('./controller');


router.get('/events/', indexEvents);     
router.get('/events/:id', find);
router.post('/events/', create);
router.delete('/events/:id', destroyEvents);

module.exports = router;