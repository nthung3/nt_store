import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
    result: any[];
    totalPage: number;
    loading: boolean;
    error: boolean;
    productDetail: {
        loading: boolean;
        result?: any;
        error: boolean;
    };
}

const initialState: ProductState = {
    result: [],
    totalPage: 0,
    loading: true,
    error: false,
    productDetail: {
        loading: true,
        error: false,
    },
};

export const getRecommendProducts = createAsyncThunk('product/getRecommend', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/recommend`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to get products');
    }
});

export const getProducts = createAsyncThunk('product/getProducts', async (params: any = {}, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, { params });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to get products');
    }
});

export const getProductDetail = createAsyncThunk(
    'product/getProductDetail',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to get product detail');
        }
    },
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecommendProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecommendProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload.data;
                state.error = false;
            })
            .addCase(getRecommendProducts.rejected, (state) => {
                state.result = [];
                state.totalPage = 0;
                state.error = true;
                state.loading = false;
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload.data;
                state.totalPage = action.payload.totalPage;
                state.error = false;
            })
            .addCase(getProducts.rejected, (state) => {
                state.result = [];
                state.totalPage = 0;
                state.error = true;
                state.loading = false;
            })
            .addCase(getProductDetail.pending, (state) => {
                state.productDetail.loading = true;
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.productDetail.loading = false;
                state.productDetail.result = action.payload.data;
                state.productDetail.error = false;
            })
            .addCase(getProductDetail.rejected, (state) => {
                state.productDetail.error = true;
                state.productDetail.loading = false;
            });
    },
});

export default productSlice.reducer;
