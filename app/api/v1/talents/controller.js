const { StatusCodes } =require ('http-status-codes');
const 
{
    createTalents, 
    getOneIdTalents, 
    deleteTalents,
    indexTalents, 
    updateTalents,
} = require ('../../../services/mongoose/talents')


const findall = async (req, res, next) => {
    try {
        const result = await indexTalents(req)
        res.status(StatusCodes.OK).json({
            message : 'Successfully',
            data : result,
        })
    } catch (err) {
        next(err)
    }
}


const create = async (req, res, next) => {
        try {
            const result = await createTalents(req)
            res.status(StatusCodes.CREATED).json({
                message : 'Successfully',
                data : result
            })
        } catch (err) {
            next (err)
        }
    }

const updateIdTalents = async (req, res, next) => {
    try {
        const result = await updateTalents(req)
        res.status(StatusCodes.OK).json({
            message : 'Updated !',
            data : result
        })
    } catch (err) {
        next(err)
    }
}


const findId = async (req, res, next) => {
        try {
            const result = await getOneIdTalents(req)
            res.status(StatusCodes.OK).json({
                messagge : 'Successfully',
                data : result
            })
        } catch (err) {
            next(err)
        }
}

const destroyTalents = async (req, res, next) => {
        try {
            const result = await deleteTalents(req);
            res.status(StatusCodes.OK).json({
                messagge : 'Deleted !',
                data : result
            })
        } catch (err) {
            next(err)
        }
}

module.exports = {
    create,
    findId,
    destroyTalents,
    findall,
    updateIdTalents,
}
