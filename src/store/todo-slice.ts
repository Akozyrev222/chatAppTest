import {TodoArrayModel, TodoModel} from "../models/redux-models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storage";

const persistedState = loadState();
const initialTodoState: TodoArrayModel = {
    all_todos: persistedState? persistedState : [],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        setTodos(state, action: PayloadAction<TodoModel[]>) {
            state.all_todos = action.payload
        },
        toggleTodoCompleted(state, action: PayloadAction<Omit<TodoModel, 'userId' | 'todo'>>) {
            state.all_todos = state.all_todos.map(obj => obj.id === action.payload.id ? {
                ...obj,
                completed: action.payload.completed
            } : obj)

        },
        toggleTodo(state, action: PayloadAction<Omit<TodoModel, 'completed'>>) {
            state.all_todos = state.all_todos.map(obj => obj.id === action.payload.id ? {
                ...obj,
                todo: action.payload.todo,
            } : obj)
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.all_todos = state.all_todos.filter(obj => obj.id !== action.payload)
        },
        addTodo(state, action: PayloadAction<TodoModel>) {
            state.all_todos = [...state.all_todos, action.payload]
        }
    }
})
export const {setTodos, toggleTodoCompleted, addTodo, toggleTodo, deleteTodo} = todoSlice.actions
export default todoSlice