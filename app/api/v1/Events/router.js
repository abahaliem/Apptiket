const express = require('express')
const router = express()
const {create,
       indexEvents,
       destroyEvents,
     } = require('./controller');


router.get('/events/', indexEvents);     
router.post('/events/', create);
router.delete('/events/:id', destroyEvents);

module.exports = router;