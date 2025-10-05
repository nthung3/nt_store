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
        const { productId } = req.params;
        
        if (!productId) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Product ID is required' 
            });
        }

        // Check if product exists
        const existingProduct = await ProductModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Product not found' 
            });
        }

        let updateData = {};

        // Parse data from form if it exists
        if (req.body.data) {
            updateData = JSON.parse(req.body.data);
        } else {
            updateData = req.body;
        }

        // Handle image upload if present
        if (req.files && req.files['imageFile']) {
            const imageFile = req.files['imageFile'][0];
            const imgResult = await cloudinary.v2.uploader.upload(imageFile.path, {
                folder: 'imageFile',
            });
            updateData.img = imgResult.secure_url;
        }

        // Update product
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ 
            status: 'error',
            message: error.message || '500 Internal Server Error' 
        });
    }
};

export const DeleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!productId) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Product ID is required' 
            });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Product not found' 
            });
        }

        await ProductService.deleteProduct({ productId });

        return res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully',
            data: product,
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ 
            status: 'error',
            message: error.message || '500 Internal Server Error' 
        });
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
