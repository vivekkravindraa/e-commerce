const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderNumber: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
// ,
// lineItems: [
//     {
//         product: {
//             type: Schema.Types.ObjectId,
//             ref: 'Product'
//         },
//         quantity: {
//             type: Number
//         },
//         price: {
//             type: Number
//         }
//     }
// ]

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order
}