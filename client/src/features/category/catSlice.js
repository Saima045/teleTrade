import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { catService } from './catService';


//const user = JSON.parse(localStorage.getItem('user'));

// define the initialState
const initialState = {
    category : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    allCategories:[]
}


export const addCategory=createAsyncThunk('cat/addCategory',async(formData,thunkAPI)=>{
    try {
        return await catService.addCategoryService(formData)
    } catch (error) {

        const message = error.response.data.error
      //  console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getCategories = createAsyncThunk('cat/get-category', async (_, thunkAPI) => {
    try {
        return await catService.getCategoryService()
    } catch (error) {
        console.log('in error get cat')
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const getCategory = createAsyncThunk('cat/get-categorydata', async (data, thunkAPI)  => {
    try {
        return await catService.getCategoryDataService(data)
    } catch (error) {
        console.log('in error get cat')
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})

// create the slice

export const catSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCatg: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
         
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.category = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                

                state.category = action.payload
            })
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.category = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allCategories= action.payload
            })

            .addCase(getCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.category = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category= action.payload
               // console.log(state.category)
            })
           
    }
});


export const {resetCatg } = catSlice.actions;
export default catSlice.reducer;