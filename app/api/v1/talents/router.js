const express = require ('express')
const router = express()
const {
    create, 
    findId,
    destroyTalents,
    findall,
    updateIdTalents,

    
    } = require('./controller')

router.get('/talents/', findall);
router.get('/talents/:id', findId);
router.post('/talents', create);
router.delete('/talents/:id', destroyTalents);
router.put('/talents/:id', updateIdTalents);


module.exports = router;
