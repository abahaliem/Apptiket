const Talents = require ('../../api/v1/talents/model')
const {CheckingImage} = require('./images')
const {BadRequestError, NotFoundError} = require('../../errors')


const indexTalents = async (req) => {
    const { keyword } = req.query;

    let condition = {}; 

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i'} }; //filter
    }

    const result = await Talents.find(condition)
        .populate({
            path : 'image',
            select : '_id urlName',
        })
        .select('_id name role image');

        return result;
}


const createTalents = async (req) => {
    const {name, role, image} = req.body;

    await CheckingImage(image)

    const check = await Talents.findOne({name});

    if(check) throw new BadRequestError('Pembicara sudah terdaftar!');

    const result = await Talents.create({name, role, image});

    return result;
    
};

const updateTalents = async(req) => {
    const {id} = req.params
    
    const {name, role, image} = req.body

    await CheckingImage(image);

    const check = await Talents.findOne({
        name,
        _id : {$ne : id}
    })

    if (check) throw new BadRequestError('Pembicara sudah terdaftar!');

    const result = await Talents.findOneAndUpdate(
        { _id : id },
        {name, role, image},
        {new : true, runValidators: true}
        )

    if (!result) throw new NotFoundError(`tidak ada pembicara dengan id: ${id}`);

    return result;
}

const getOneIdTalents = async (req) => {
    const {id} = req.params;

    const result = await Talents.findById({_id : id})
    .populate({
        path : 'image',
        select : '_id urlName'
    })
     .select('_id name role image');

     if (!result)
     throw new NotFoundError(` tidak ada pembicara dengan id: ${id}`)

     return result
}

const deleteTalents = async (req) => {
    const {id} = req.params;

    const result = await Talents.findOne({_id : id})

    if (!result) throw new NotFoundError(` tidak ada pembicara dengan id : ${id}`);

    await result.remove()

    return result;

}

const checkingTalents = async (id) => {

    const check = await Talents.findOne({_id : id})

    if(!check) throw new NotFoundError(` Tidak ada pembicara dengan id : ${id}`);

    return check;

}


module.exports = {
    createTalents,
    getOneIdTalents,
    deleteTalents,
    indexTalents,
    updateTalents,
    checkingTalents,
}