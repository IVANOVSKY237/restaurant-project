import { createSlice } from "@reduxjs/toolkit";
import { tables as initialTables } from "../../constants";

const initialState = {
    tables: initialTables,
    selectedTable: null,
    filterStatus: "all"
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        selectTable: (state, action) => {
            state.selectedTable = action.payload;
        },
        updateTableStatus: (state, action) => {
            const { tableId, status } = action.payload;
            const table = state.tables.find(t => t.id === tableId);
            if (table) {
                table.status = status;
            }
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
        bookTable: (state, action) => {
            const { tableId, customerInfo } = action.payload;
            const table = state.tables.find(t => t.id === tableId);
            if (table) {
                table.status = "Booked";
                table.customerInfo = customerInfo;
            }
        },
        releaseTable: (state, action) => {
            const tableId = action.payload;
            const table = state.tables.find(t => t.id === tableId);
            if (table) {
                table.status = "Available";
                delete table.customerInfo;
            }
        }
    }
});

export const { 
    selectTable, 
    updateTableStatus, 
    setFilterStatus, 
    bookTable, 
    releaseTable 
} = tableSlice.actions;

export default tableSlice.reducer;
