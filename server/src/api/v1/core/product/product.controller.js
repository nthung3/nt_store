import ProductModel from './product.model.js';
import ProductService from './product.service.js';
import cloudinary from '../../../../config/cloudinary.js';

export const CreateProduct = async (req, res) => {
    try {
        const Product = JSON.parse(req.body.data);

        const imageFile = req.files['imageFile'][0];

        const imgResult = await cloudinary.v2.uploader.upload(imageFile.path, {
            folder: 'imageFile',
        });
        const img = imgResult.secure_url;
        const newProduct = {
            ...Product,
            img,
        };
        // const newBlog = new BlogModal({
        //     ...blog,
        //     imageFile: resultImage.secure_url,
        //     creator: req.userId,
        //     createdAt: new Date().toISOString(),
        // });
        return res.status(201).json(await ProductService.createProduct({ newProduct }));
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const ListProduct = async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const total = await ProductModel.countDocuments({});
        const totalPage = Math.ceil(total / pageSize);
        if (page > totalPage) return res.status(403).json({ message: `max page ${totalPage}` });
        return res
            .status(200)
            .json({ data: await ProductService.listProducts({ page, pageSize }), totalPage: totalPage });
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const ListProductRECOMMENDED = async (req, res) => {
    try {
        const { limit = 9 } = req.query;

        return res.status(200).json({ data: await ProductService.listProductsRecommend({ limit }) });
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const UpdateProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const { categoryId, img, name, dsc, price } = req.body;

        if (!productId) return res.status(404).json({ message: 'Product not found' });
        return res
            .status(201)
            .json(await ProductService.updateProduct({ productId, categoryId, img, name, dsc, price }));
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const DeleteProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const Id = await ProductModel.findById(productId);
        if (!Id) return res.status(404).json({ message: 'Can not find product id' });

        return res.status(201).json({
            status: 'delete success',
            message: `${productId} has been delete successful`,
            data: await ProductService.deleteProduct({ productId }),
        });
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        console.log(productId);
        return res.status(200).json({ data: await ProductService.productById({ productId }) });
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const CreateProductByFix = async (req, res) => {
    try {
        const { categoryId, img, name, dsc, price } = req.body;
        console.log(req.body);
        // const blog = JSON.parse(req.body.data);

        // const imageFile = req.files['imageFile'][0];

        // const img = await cloudinary.v2.uploader.upload(imageFile.path, {
        //     folder: 'imageFile',
        // });
        // const newBlog = new BlogModal({
        //     ...blog,
        //     imageFile: resultImage.secure_url,
        //     creator: req.userId,
        //     createdAt: new Date().toISOString(),
        // });
        return res.status(201).json(await ProductService.createProductByFix({ categoryId, img, name, dsc, price }));
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};
