import {createSlice} from '@reduxjs/toolkit'
import { addProduct, updateProduct,getFilterProducts,productPagination, deleteProduct, getAllProducts  , getProductById , addReview} from './productThunk';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
        productDetails: null,
    },
    reducers: {
    },
     extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p._id !== action.payload._id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
            }).addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
        ).addCase(addReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
        }).addCase(addReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getFilterProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getFilterProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }).addCase(getFilterProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    ).addCase(productPagination.pending, (state) => {
        state.loading = true;
        state.error = null;

    }).addCase(productPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
    }).addCase(productPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
     }});

export default productSlice.reducer