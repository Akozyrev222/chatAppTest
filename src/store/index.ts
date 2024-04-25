import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
import {saveState} from "./storage";

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    }
})

store.subscribe(() => {
    saveState(store.getState().todo.all_todos)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store