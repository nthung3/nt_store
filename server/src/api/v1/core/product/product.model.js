import mongoose from 'mongoose';
import moment from 'moment';
const create = moment().format();

const ProductSchema = mongoose.Schema(
    {
        categoryId: { type: String, require: true },
        img: {
            type: 'String',
        },
        name: {
            type: 'String',
        },
        dsc: {
            type: 'String',
        },
        price: {
            type: 'Number',
        },
        like: {
            type: 'Number',
            default: 0,
        },
        createdAt: { type: Date, default: create },
        updatedAt: { type: Date, default: create },
    },
    {
        collection: 'products',
        timestamps: true,
    },
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
