import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API, base_url } from '../Api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';
import { errorToast, successToast } from '../../utils/customToast';


const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  forgotData: null,
  betOption:null,
  gameResult:null,
  newbetOption:null
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {


  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const formdata = new FormData();
    formdata.append("email", params.email);
    formdata.append("password", params.password);
    formdata.append("device_token", params.device_token);
    formdata.append("device_type", params.device_type);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const respons = fetch(base_url.url + "/user/auth/login", requestOptions)
      .then((response) => response.text())
      .then((res) => {
        const response = JSON.parse(res)

        if (response.status == '1') {
          thunkApi.dispatch(loginSuccess({ ...response.data, token: response?.token }));
          params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          successToast(
            'Login Successful'

          );
          return { ...response.data, token: response?.token }
        } else {
          errorToast(

            response.message,

          );

          return response
        }
      })
      .catch((error) => console.error(error));


    return respons
  } catch (error) {
    console.log('Error:', error);
    errorToast(
      'Network error',


    );
    return thunkApi.rejectWithValue(error);
  }
});
export const register = createAsyncThunk('register', async (params, thunkApi) => {


  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const formdata = new FormData();
    formdata.append("user_name", params.user_name);
    formdata.append("mobile", params.mobile);
    formdata.append("email", params.email);
    formdata.append("password", params.password);
    formdata.append("confirm_password", params.confirm_password);


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    const respons = fetch(base_url.url + "/user/auth/register", requestOptions)
      .then((response) => response.text())
      .then((res) => {
        const response = JSON.parse(res)

        if (response.status == '1') {

          params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
          successToast(
            'User Register Successfully'

          );
          return response
        } else {
          errorToast(

            response.message,

          );

          return response
        }
      })
      .catch((error) => console.error(error));


    return respons
  } catch (error) {
    console.log('Error:', error);
    errorToast(
      'Network error',


    );
    return thunkApi.rejectWithValue(error);
  }
});

export const PasswordReset = createAsyncThunk(
  'PasswordReset',
  async (params, thunkApi) => {


    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('email', params.email); // Adjust field names as per your API requirements

      const response = await API.post('/user/auth/forgot-password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set appropriate content type for form data
        },
      });

      if (response.data.message == 'Password Sent Successfully') {
        successToast(
          'OTP Sent Successfully',

        );

        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN);
      } else {
        errorToast(
          response.data.message

        );
      }

      return response.data;
    } catch (error) {
      console.log('Error:', error);
      Alert.alert(
        'Network Error',
        'Server not responding, please try again later',

      );
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const validOtp = createAsyncThunk(
  'auth/validOtp',
  async (params, thunkApi) => {



    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('user_id', params.user_id);
      formData.append('otp', params.otp);

      const response = await API.post('/user/auth/check-otp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set appropriate content type for form data
        },
      });

      console.log('response.data', response.data);

      if (response.data.status == '1') {
        successToast(
          'OTP Verified Successfully',

        );

        params.navigation.navigate(ScreenNameEnum.CREATE_PASSWORD);
      } else {
        errorToast(
          response.data.message,
        );
      }

      return response.data.data;
    } catch (error) {
      console.log('Error:', error);

      errorToast(
        'Network Error',


      );
      navigation.goBack()

      return thunkApi.rejectWithValue(error);
    }
  }
);
export const CreateNewPassword = createAsyncThunk(
  'create-new-password-without-login',
  async (params, thunkApi) => {


    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      const formdata = new FormData();
      formdata.append("password", params.password);
      formdata.append("confirm_password", params.confirm_password);
      formdata.append("email", params.email);


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = fetch(base_url.url + '/user/auth/change-password', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const response = JSON.parse(result)
          console.log('response', response);
          if (response.status == '1') {
            params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
            successToast('Password Change Successfully');
            return response
          } else {
            errorToast(response.message);
            params.navigation.navigate(ScreenNameEnum.PASSWORD_RESET);
            return response
          }
        })
        .catch((error) => console.error(error));


      return response;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network Error');

      return thunkApi.rejectWithValue(error);
    }
  }
);
export const Get_betOption = createAsyncThunk(
  'Get_betOption',
  async (params, thunkApi) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${params.token}`);

      const formdata = new FormData();
      formdata.append("dependency", params.dependency);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        "https://server-php-8-3.technorizen.com/oneTen/api/user/get_current_games",
        requestOptions
      );

  

      const result = await response.json();

      if (result.status == "1") {
        return result.data;
      } else {
        return thunkApi.rejectWithValue(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);

      return thunkApi.rejectWithValue(error.message || "Network Error");
    }
  }
);

export const Get_New_betOption = createAsyncThunk(
  'Get_New_betOption',
  async (params, thunkApi) => {


    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${params.token}`);

      const formdata = new FormData();
      formdata.append("dependency", params.dependency)


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = fetch('https://server-php-8-3.technorizen.com/oneTen/api/user/get_current_games', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const response = JSON.parse(result)
        

          if (response.status == '1') {
           return response?.data
          } else {
           
            return response?.data
          }
        })
        .catch((error) => console.error(error));


      return response;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network Error');

      return thunkApi.rejectWithValue(error);
    }
  }
);
export const Get_Result = createAsyncThunk(
  'Get_Result',
  async (params, thunkApi) => {
    console.log('params=>>>>>>>>>', params);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${params.token}`);

      const formdata = new FormData();
      formdata.append("game_id", params.game_id);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch('https://server-php-8-3.technorizen.com/oneTen/api/user/get_result', requestOptions);
      
      if (!response.ok) {
        // If the response status is not OK (not 200-299), throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const parsedResult = await response.json();
      
  

      if (parsedResult.status === '1') {
        return parsedResult;
      } else {
        return parsedResult;
      }
      
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network Error');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {


    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${params.token}`);

      const formdata = new FormData();
      formdata.append("user_name", params.user_name);
      formdata.append("email", params.email);
      formdata.append("mobile", params.mobile);
      formdata.append("gender", params.gender);
      formdata.append("dob", params.dob);
      formdata.append("image", params.image);


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = fetch(base_url.url + '/user/profile/update-profile', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const response = JSON.parse(result)
          console.log('result', response?.status);

          if (response?.status == '1') {

            successToast('Profile Update Successfully');
            return response
          } else {
            errorToast(response.message);

            return response
          }
        })
        .catch((error) => console.error(error));


      return response;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network Error');

      return thunkApi.rejectWithValue(error);
    }
  }
);
export const Change_password = createAsyncThunk(
  'Change_password',
  async (params, thunkApi) => {


    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Accept", "application/json");

      const formdata = new FormData();
      formdata.append("email", params.email);
      formdata.append("old_password", params.old_password);
      formdata.append("password", params.password);
      formdata.append("confirm_password", params.confirm_password);



      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = fetch(base_url.url + '/user/auth/change_password_after_login', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const response = JSON.parse(result)
          console.log('response', response);
          if (response.status == '1') {

            successToast('Password Change Successfully');
            return response
          } else {
            errorToast(response.message);

            return response
          }
        })
        .catch((error) => console.error(error));


      return response;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network Error');

      return thunkApi.rejectWithValue(error);
    }
  }
);


export const logout = createAsyncThunk('logout', async (params, thunkApi) => {
  try {
    const response = await API.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });


    if (response.data.status == '1') {
      successToast('User LogOut Successfuly');
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    } else {
      errorToast('User LogOut Faild');
    }

  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});
export const delete_acc = createAsyncThunk('delete_acc', async (params, thunkApi) => {
  try {
    const response = await API.get('/auth/delete-acc', null, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });



    if (response.data.status == '1') {
      successToast('User Account Successfuly');
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    } else {
      errorToast('User LogOut Faild');
    }

  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: delete_acc.js:32 ~ delete_acc ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});


const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;

    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
    builder.addCase(PasswordReset.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(PasswordReset.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;


    });
    builder.addCase(PasswordReset.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.betOption = []

    });
    builder.addCase(Get_betOption.pending, state => {
      state.isLoading = false;
    });
    builder.addCase(Get_betOption.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.betOption = action.payload
    });

    
    builder.addCase(Get_betOption.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.betOption = []

    });
    builder.addCase(Get_New_betOption.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Get_New_betOption.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.newbetOption = action.payload
    });


    builder.addCase(Get_New_betOption.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.betOption = []

    });
    builder.addCase(Get_Result.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Get_Result.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.gameResult = action.payload


    });
    builder.addCase(Get_Result.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder.addCase(Change_password.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Change_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;


    });
    builder.addCase(Change_password.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;


    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder.addCase(delete_acc.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_acc.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = false

    });
    builder.addCase(delete_acc.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder.addCase(validOtp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(validOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.forgotData = action.payload

    });
    builder.addCase(validOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
    builder.addCase(CreateNewPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

    });
    builder.addCase(CreateNewPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;

    });
  },


});

export const { loginSuccess } = AuthSlice.actions;

export default AuthSlice.reducer;
