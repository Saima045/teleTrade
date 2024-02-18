import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';


const user = JSON.parse(localStorage.getItem('user'));

// define the initialState
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    userdata:null
}



// handle the registration

export const signUP = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
    try {
      //  console.log(formData)
        return await authService.registerUser(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.error) ;
       // console.log( message)
        return thunkAPI.rejectWithValue(message)
    }
})



export const logout = createAsyncThunk('auth/logout',async (_, thunkAPI) => {
    console.log('in logout')
    try {
         await authService.signOUT()
         return
    } catch (error) {


      
        throw error;
    }
})

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await authService.signIn(data)
    } catch (error) {

        const message = error.response.data.error
      //  console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk('auth/update', async (data, thunkAPI) => {
    try {
        return await authService.updateUserService(data)
    } catch (error) {

        const message = error.response.data.error
      //  console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserData = createAsyncThunk('auth/getuser', async (data, thunkAPI) => {
    try {
        return await authService.getUserService(data)
    } catch (error) {

        const message = error.response.data.error
      //  console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})

// create the slice

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
         
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUP.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(signUP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "An Error Occured while loging out"
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.user = null
                state.message = ''//action.payload
              console.log('fulfilled')
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
              // console.log(action.payload)
                state.message = action.payload;

                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
              // console.log(action.payload)
                state.message = action.payload;

                state.user = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isSuccess = true;
                state.message='Profile updated sucessfully!'
                state.user = action.payload;
            })

            .addCase(getUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
              // console.log(action.payload)
                state.message = action.payload;
                state.userdata=null

//                state.user = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isSuccess = false;
               // state.message='Profile updated sucessfully!'
                state.userdata = action.payload;
            })



    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;