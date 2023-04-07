import HTTPS from './base';

export class Product {
    static createProduct(data) {
        return HTTPS.post('product/createProduct', data);
    }
    static deleteProduct(productId) {
        return HTTPS.delete(`product/deleteProduct?productId=${productId}`);
    }
    static updateProduct(productId, data) {
        return HTTPS.patch(`product/updateProduct?productId=${productId}`, data);
    }
    static GetRecommend() {
        return HTTPS.get('product/recommend');
    }
    static GetAllProduct(params) {
        return HTTPS.get('product', { params });
    }
    static GetProductByID(productId) {
        return HTTPS.get(`product/${productId}`);
    }
}
