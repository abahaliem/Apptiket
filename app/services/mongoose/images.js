const Images = require('../../api/v1/Images/model')
const {NotFoundError} = require('../../errors')

const createImages = async (req) => {
    const result = await Images.create({
        urlName: req.file
        ? `uploads/${req.file.filename}`
        : 'uploads/avatar/default.jpeg',
     })
     return result; 
}

const CheckingImage = async (id) => {
    
    const check = await Images.findOne({_id : id})
    console.log(check)
    if (!check) throw new  NotFoundError (`Tidak ada gambar pada id : ${id}`)
    return check;

}

module.exports = {
    createImages, CheckingImage
    
}
