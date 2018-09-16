const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    codEligible: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
    // ,
    // unitPurchase: {
    //     type: Number
    // }
    // reviews: [
    //     {
    //         title: {
    //             type: String
    //         },
    //         body: {
    //             type: String
    //         },
    //         rating: {
    //             type: Number
    //         },
    //         user: {
    //             type: Schema.Types.ObjectId
    //             ref: 'User'
    //         }
    //     } 
    // ]
})

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}