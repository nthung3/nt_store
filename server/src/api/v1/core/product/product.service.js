import ProductModel from './product.model.js';

class ProductService {
    static async listProducts({ page = 1, pageSize = 10 }) {
        try {
            const allProducts = await ProductModel.find()
                .sort({ _id: -1 })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
            return allProducts;
        } catch (error) {
            console.log(error);
        }
    }
    static async createProduct({ newProduct }) {
        console.log(newProduct);
        try {
            const product = await ProductModel.create(newProduct);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateProduct({ productId, Product }) {
        try {
            const product = await ProductModel.findByIdAndUpdate(
                { _id: productId },
                {
                    $set: {
                        Product,
                    },
                },
                { upsert: true, new: true },
            );
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteProduct({ productId }) {
        try {
            const product = await ProductModel.findByIdAndDelete({ _id: productId });
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    static async listProductsRecommend({ limit = 9 }) {
        try {
            const Products = await ProductModel.find(
                { $expr: { $lt: [0.5, { $rand: {} }] } },
                { _id: 0, name: 1, img: 1, dsc: 1, price: 1, like: 1 },
            ).limit(limit);
            return Products;
        } catch (error) {
            console.log(error);
        }
    }

    static async productById({ productId }) {
        console.log(productId);
        try {
            const Product = await ProductModel.findOne({ _id: productId, upsert: true });
            return Product;
        } catch (error) {
            console.log(error);
        }
    }

    static async createProductByFix({ categoryId = '', img = '', name = '', dsc = '', price = 0, like = 0 }) {
        try {
            const product = await ProductModel.create({
                categoryId,
                img,
                name,
                dsc,
                price,
                like,
            });
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductService;
