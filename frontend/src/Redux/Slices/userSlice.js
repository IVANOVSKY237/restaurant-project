 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    isAuth: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {_id, name, email, phone, role} = action.payload;
            state.isAuth = true;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.role = role;
        },
        removeUser: (state) => {
            state.isAuth = false;
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "";
            state.role = "";
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
