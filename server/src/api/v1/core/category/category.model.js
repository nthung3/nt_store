import mongoose from 'mongoose';
import moment from 'moment';
const create = moment().format();

const CategorySchema = mongoose.Schema(
    {
        categoryId: { type: String, require: true },
        name: {
            type: 'String',
        },
        createdAt: { type: Date, default: create },
        updatedAt: { type: Date, default: create },
    },
    {
        collection: 'category',
        timestamps: true,
    },
);

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
