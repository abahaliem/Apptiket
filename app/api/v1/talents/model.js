const mongoose = require ('mongoose')

const {model, Schema} = mongoose

let talentSchema = Schema ({
    name : {
        type: String,
        required : [true, 'Nama harus di isi']
    },

    role : {
        type: String,
        default : '-',
    },

    // Untuk mengambil relasi pada mongodb pada tabel Image menggunakan type ObjectID
    image : {
        type : mongoose.Types.ObjectId,
        ref : 'Image', //ref harus sesuai dengan string pada model
        required : true,
    },
},
    {timestamps : true}

);

module.exports = model ('Talent', talentSchema);