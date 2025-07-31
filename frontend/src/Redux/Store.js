import { configureStore } from '@reduxjs/toolkit'
import customerSlice from "./Slices/customerSlice"
import tableSlice from "./Slices/tableSlice";
import cartSlice from "./Slices/CartSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
    reducer: {
        customer: customerSlice,
        table: tableSlice,
        cart : cartSlice,
        user : userSlice
    },
    devTools: import.meta.env.NODE_ENV !== "production" ? {
        actionsDenylist: [
            'table/selectTable',
            'table/updateTableStatus',
            'table/setFilterStatus',
            'table/bookTable',
            'table/releaseTable',
            'customer/updateTable'
        ],
        stateSanitizer: (state) => {
            const { table: _table, ...stateWithoutTable } = state;
            return stateWithoutTable;
        }
    } : false,
});

export default store;