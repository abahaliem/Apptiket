const mongoose = require('mongoose');
const {model, Schema} = mongoose;

let categorySchema = Schema({
    name : {
        type: String,
        minlength : [3, 'Panjang kategori minimal 3 karakter'],
        maxlength : [20, 'panjang kategori maksimal 20 karakter'],
        required : [true, 'Nama kategori harus diisi'],
       
    },
    
},

{timestamps: true},

);

module.exports = model('Category', categorySchema)