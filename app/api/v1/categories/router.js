const express = require('express');
const router = express()
const {create, index, findId,updateCategories,destroyCategories} = require ('./controller')

router.get('/categories', index);
router.post('/categories', create);
router.get('/categories/:id', findId);
router.put('/categories/:id',updateCategories )
router.delete('/categories/:id',destroyCategories)


module.exports = router;
