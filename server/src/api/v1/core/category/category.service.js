import CategoryModel from './category.model.js';

class CategoryService {
    static async listCategory() {
        try {
            const allCategory = await CategoryModel.find().sort({ _id: -1 });
            return allCategory;
        } catch (error) {
            console.log(error);
        }
    }
    static async createCategory({ name = '' }) {
        try {
            const product = await CategoryModel.create({
                name,
            });
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CategoryService;
