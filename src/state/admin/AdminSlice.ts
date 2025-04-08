import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminSliceSchema,
  InitialServiceData,
  //   AdminCustomerFormSchema,
  //   ServiceType,
  //   APiType,
} from "./admin";

const API_URL = process.env.DATABASE_URL;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch(`${API_URL}/users`); // ✅ Use API URL
  return await response.json();
});

const initialState: AdminSliceSchema = {
  platform: {
    user: {
      _add_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
      _edit_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
      _view_CustomerForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
          active: false,
          password: "",
        },
        details: [],
      },
    },
    appointment: {
      _add_AppointmentForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
      _edit_AppointmentForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
      _view_AppointmentForm: {
        id: null,
        input: {
          full_name: "",
          email: "",
          phone_number: "",
          service: "",
          date: "",
          time: "",
          message: "",
        },
        details: [],
      },
    },
  },
  admin: {
    user: InitialServiceData,
    sidebar: InitialServiceData,
    appointment: InitialServiceData,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAddCustomerFormTrue: (state, action) => {
      state.admin.user.add.isFlag = action.payload;
    },
    setAddAppointmentFormTrue: (state, action) => {
      state.admin.appointment.add.isFlag = action.payload;
    },
    setOpenSidebarTrue: (state, action) => {
      state.admin.sidebar.add.isFlag = action.payload;
    },
    setCustomerView: (state, action) => {
      state.admin.user.viewType.view = action.payload;
    },
    setAppointmentView: (state, action) => {
      state.admin.appointment.viewType.view = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.platform.user._view_CustomerForm.details = action.payload;
    });
  },
});

export const {
  setAppointmentView,
  setCustomerView,
  setAddCustomerFormTrue,
  setOpenSidebarTrue,
  setAddAppointmentFormTrue,
} = adminSlice.actions;
export default adminSlice.reducer;
