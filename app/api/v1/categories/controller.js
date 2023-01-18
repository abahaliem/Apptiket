const { StatusCodes } = require('http-status-codes');

const 
    {indexCategories,
    createCategories,
    findIdCategories,
    updateIdCategories,
    destroyIdCategories,
    } = require ('../../../services/mongoose/categories');
    

const create = async (req, res,next) => {
    try {
       const result = await createCategories(req)
       res.status(StatusCodes.CREATED).json({
        data: result,
       }) 
    } catch (err) {
        next(err)
    };  
}

const index = async (req, res,next) => {
try {
   const result =  await indexCategories()
   //.select('_id name')
    res.status(StatusCodes.OK).json({
        data: result,
    })

} catch (err) {
    next(err)
}
}

const findId = async (req, res,next) => {
    try {
    const result = await findIdCategories(req);
    res.status(StatusCodes.OK).json({
        data: result,
    })

    } catch (err) {
       (next(err))
    }
}

const updateCategories = async (req, res, next) => {
    try {
       const result = await updateIdCategories(req)
        res.status(StatusCodes.OK).json({
            message : 'Updated!',
           data: result
        })

    } catch (err) {
        next(err)
    }
}

const destroyCategories = async (req, res, next) => {
    try {
        const result = await destroyIdCategories(req)
        res.status(StatusCodes.OK).json({
            message : 'Deleted!',
            data : result
        })

    } catch (err) {
        next(err)
    }
}


module.exports ={
    create,
    index,
    findId,
    updateCategories,
    destroyCategories,
};
