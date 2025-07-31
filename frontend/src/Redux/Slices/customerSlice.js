import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orderId:"",
    customerName: "",
    customerPhone: "",
    guest:0,
    tableNo:""
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomerName: (state, action) => {
            const {name, phone, guests} = action.payload;
            state.orderId = `${Date.now()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guest = guests;
        },
        setCustomerPhone: (state, action) => {
            state.customerPhone = action.payload;
        },
        setGuest: (state, action) => {
            state.guest = action.payload;
        },
        setTableNo: (state, action) => {
            state.tableNo = action.payload;
        },
        removeCustomer: (state) => {
            state.customerName = "";
            state.customerPhone = "";
            state.guest = 0;
            state.tableNo = "";
        },
        updateTable: (state, action) => {
            state.tableNo = action.payload.tableNo;
        }
    }
});

export const { setCustomerName, setCustomerPhone, setGuest, setTableNo, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;
