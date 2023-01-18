const Categories = require ('../../api/v1/categories/model')
const {BadRequestError, NotFoundError} = require('../../errors')


const indexCategories = async () => {
    const result = await Categories.find()
    return result;
}

const createCategories = async (req) =>{
    const {name} = req.body;
   
    const check = await Categories.findOne({name})
    
    if (check) throw new BadRequestError('Duplicated Category !');

    const result = await Categories.create({name})

    return result;
};

const findIdCategories = async (req) => {
    const {id} = req.params;
    
    const result = await Categories.findById(id);

    if (!result) throw new NotFoundError (`Tidak ada kategori dengan id : ${id}`)
    return result
};


const updateIdCategories = async (req) => {
    
    const {id} = req. params
    const {name} = req.body
  
    const check = await Categories.findOne({name, _id : {$ne : id}})

    if (check) throw new BadRequestError ('Kategori Nama Duplikat')

    const result = await Categories.findByIdAndUpdate (
        {_id : id},
        {name},
        {new: true, runValidators:true})

     if (!result) throw new NotFoundError (`Tidak ada kategori dengan id : ${id}`) 
     
     return result

};

const destroyIdCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findByIdAndRemove(id)

    if (!result) throw new NotFoundError (`Tidak ada kategori dengan id : ${id}`)

    await result.remove()

    return result;

};


module.exports = {
    indexCategories,
    createCategories,
    findIdCategories,
    destroyIdCategories,
    updateIdCategories
}