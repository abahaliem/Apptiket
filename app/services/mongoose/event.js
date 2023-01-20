const Events = require ('../../api/v1/Events/model');
const {checkingCategories} = require('./categories');
const {CheckingImage} = require('./images');
const {checkingTalents} = require('./talents');

const {BadRequestError, NotFoundError} = require('../../errors')


const getAllEvents = async (req) => {
    const { keyword, category, talent} = req.query;

        let condition = {};
        
        if (keyword) {
            condition = {...condition, title: { $regex: keyword, $options: 'i'}}
        }

        if (category) {
            condition = {...condition, category: category }
        }

        if (talent) {
            condition = {...condition, talent:talent}
        }
    
        const result = await Events.find(condition)
            .populate({
                path : 'image',
                select : '_id urlName',
            })
            .populate({
                path : 'talent',
                select : '_id name role image',
                populate: {
                    path: 'image', 
                    select : '_id urlName'
                },
            })

           return result; 

}

 

const createEvent = async (req) => {

    const  {
        title,
        date,
        about,
        tagline,
        keyPoint,
        venueName,
        statusEvent,
        tickets,
        image,
        category,
        talent,

    } = req.body

    await CheckingImage(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const check = await Events.findOne({title})

    if (check) throw new BadRequestError(' Judul Event sudah terdaftar');

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        keyPoint,
        venueName,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    })

    return result;
}

const deleteEvents = async (req) => {
    const {id} = req.params;

    const result = await Events.findOne({_id : id})

    if (!result) throw new NotFoundError(`Tidak ada Event dengan id : ${id}`)

    await result.remove()

    return result
}

module.exports = {
    createEvent,
    getAllEvents,
    deleteEvents,
}