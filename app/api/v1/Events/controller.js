const {StatusCodes} = require ('http-status-codes')
const {
    createEvent,
    getAllEvents,
    deleteEvents,
    getIdEvents
    } = require('../../../services/mongoose/event');


const indexEvents = async(req, res, next) => {
    try {
        const result = await getAllEvents(req);
        res.status(StatusCodes.OK).json({
            data : result
        })
    } catch (err) {
        next(err)
    }
}


const create = async (req, res, next) => {
  try {
    const result = await createEvent(req);

    res.status(StatusCodes.CREATED).json({
        message : 'Successfully!',
        data : result,
    })
  } catch (err) {
    next(err)
  }
}


const find = async (req, res, next) => {
    try {
      const result = await getIdEvents(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });

      console.log(result)
    } catch (err) {
      next(err);
      
    }
  };

 



const destroyEvents = async (req, res, next) => {
    try {
        const result = await deleteEvents(req);
        res.status(StatusCodes.OK).json({
            message : 'Successfully!',
            data : result
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    create,
    indexEvents,
    destroyEvents,
    find,
}