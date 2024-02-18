import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { prodService } from './prodService';


//const productAd = JSON.parse(localStorage.getItem('product'));

// define the initialState
const initialState = {
    productAd:null,
   // productAd : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    products:[],
    updateSuccess:false,
    productGetSuccess:false,
    searchSuccess:false
}


export const addProduct=createAsyncThunk('prod/addProduct',async(formData,thunkAPI)=>{
    try {
        return await prodService.addProdService(formData)
    } catch (error) {

        const message = error.response.data.error
      //  console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateProduct=createAsyncThunk('prod/update-product',async(formData,thunkAPI)=>{
   // console.log('in update slice')
    try {
        return await prodService.editProduct(formData)
    } catch (error) {
        //console

        const message = error.response.data.error
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteProduct=createAsyncThunk('prod/delete-product',async(formData,thunkAPI)=>{
    // console.log('in update slice')
     try {
         return await prodService.deleteProductServ(formData)
     } catch (error) {
         //console
 
         const message = error.response.data.error
         
         return thunkAPI.rejectWithValue(message)
     }
 })

export const getProductsInCat = createAsyncThunk('productsIncategory', async (data, thunkAPI) => {
    try {
        //console.log(data)
        return await prodService.getProductsService(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})

export const getProduct = createAsyncThunk('productsingle', async (data, thunkAPI) => {
    try {
        //console.log(data)
        return await prodService.getProductService(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})

export const getProductsUser = createAsyncThunk('productsuser', async (data, thunkAPI) => {
    try {
        //console.log(data)
        return await prodService.getProdsUserSerc(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})

export const getProductsSearch = createAsyncThunk('productsearcg', async (data, thunkAPI) => {
    try {
        //console.log(data)
        return await prodService.listProductsSearch(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)

    }
})


// create the slice

export const prodSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetProd: (state) => {
            
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.updateSuccess=false;
            state.productGetSuccess=false;
            state.searchSuccess=false;
            state.message = '';


         //   console.log(state.isSuccess) 
         
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.productAd = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.productAd = action.payload
            })
            .addCase(getProductsInCat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsInCat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
               // state.products = null;
            })
            .addCase(getProductsInCat.fulfilled, (state, action) => {
                state.isLoading = false;
              //  state.isSuccess = false;
                //console.log(action.payload)
                state.products = action.payload
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.productAd = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productGetSuccess =true ;
                state.productAd = action.payload
            })

            .addCase(getProductsUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.productAd = null;
            })
            .addCase(getProductsUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.products = action.payload
               // console.log(state.products)
            })

            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.productAd = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateSuccess = true;
                state.productAd = action.payload
               // console.log(state.products)
            })

            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.productAd = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
               // console.log(state.products)
            })

            .addCase(getProductsSearch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                
            })
            .addCase(getProductsSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchSuccess = true;
                state.products = action.payload;
               // console.log(state.products)
            })


           
    }
});


export const {resetProd } = prodSlice.actions;
export default prodSlice.reducer;