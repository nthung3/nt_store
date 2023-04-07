import { ProductType } from '@/constants/product';

const initalState = {
    result: [],
    totalPage: 0,
    loading: true,
    error: false,
};

export const ProductReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case ProductType.GetRecommend:
            return { ...state, loading: false, result: action.payload.data };
        case ProductType.GetRecommend_Fail:
            return { ...state, result: [], totalPage: 0, error: true, loading: false };
        case ProductType.GetProduct:
            return { ...state, loading: false, result: action.payload.data, totalPage: action.payload.totalPage };
        case ProductType.GetProduct_FaiL:
            return { ...state, result: [], totalPage: 0, error: true, loading: false };
        default:
            return state;
    }
};

export const ProductDetailReducer = (state = { loading: true }, action: any) => {
    switch (action.type) {
        case ProductType.GetProductDetail_Loading:
            return { loading: true };
        case ProductType.GetProductDetail:
            return { loading: false, result: action.payload.data };
        case ProductType.GetProductDetail_Fail:
            return { ...state, error: true, loading: false };
        default:
            return state;
    }
};

export const CreateProductReducer = (state = { loading: true }, action: any) => {
    switch (action.type) {
        case ProductType.CreateProduct_Loading:
            return { loading: true };
        case ProductType.CreateProduct:
            return { loading: false, result: action.payload.data };
        case ProductType.CreateProduct_FaiL:
            return { ...state, error: true, loading: false };
        default:
            return state;
    }
};

export const UpdateProductReducer = (state = { loading: true }, action: any) => {
    switch (action.type) {
        case ProductType.UpdateProduct_Loading:
            return { loading: true };
        case ProductType.UpdateProduct:
            return { loading: false, result: action.payload.data };
        case ProductType.UpdateProduct_FaiL:
            return { ...state, error: true, loading: false };
        default:
            return state;
    }
};

export const DeleteProductReducer = (state = { loading: true }, action: any) => {
    switch (action.type) {
        case ProductType.DeleteProduct_Loading:
            return { loading: true };
        case ProductType.DeleteProduct:
            return { loading: false, result: action.payload.data };
        case ProductType.DeleteProduct_FaiL:
            return { ...state, error: true, loading: false };
        default:
            return state;
    }
};
