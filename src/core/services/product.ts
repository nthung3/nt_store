import { Product } from '@/app/api/product.api';
import { ProductType } from '@/constants/product';

export const getRecommend = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Product.GetRecommend();

            dispatch({ type: ProductType.GetRecommend, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.GetRecommend_Fail, payload: res });
            console.log(error);
        }
    };
};

export const getProduct = (params = { page: 1, pageSize: 12 }): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Product.GetAllProduct(params);

            dispatch({ type: ProductType.GetProduct, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.GetProduct_FaiL });
            console.log(error);
        }
    };
};

export const getProductbyid = (productId): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ProductType.GetProductDetail_Loading, payload: productId });
        try {
            const res = await Product.GetProductByID(productId);

            dispatch({ type: ProductType.GetProductDetail, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.GetProductDetail_Fail });
            console.log(error);
        }
    };
};

export const CreateProduct = (data): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ProductType.CreateProduct_Loading });
        try {
            const res = await Product.createProduct(data);

            dispatch({ type: ProductType.CreateProduct, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.CreateProduct_FaiL });
            console.log(error);
        }
    };
};

export const UpdateProduct = (productId, data): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ProductType.UpdateProduct_Loading });
        try {
            const res = await Product.updateProduct(productId, data);

            dispatch({ type: ProductType.UpdateProduct, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.UpdateProduct_FaiL });
            console.log(error);
        }
    };
};

export const DeleteProduct = (productId): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ProductType.DeleteProduct_Loading });
        try {
            const res = await Product.deleteProduct(productId);

            dispatch({ type: ProductType.DeleteProduct, payload: res });
        } catch (error) {
            dispatch({ type: ProductType.DeleteProduct_FaiL });
            console.log(error);
        }
    };
};
