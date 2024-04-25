import {TodoModel} from "../models/redux-models";

export const loadState = () => {
    try {
        const storage = localStorage.getItem('todos');
        if (storage === null) {
            return undefined;
        }
        return JSON.parse(storage);
    } catch (err) {
        return undefined;
    }
};


export const saveState = (state: TodoModel[]) => {
    try {
        const storage = JSON.stringify(state);
        localStorage.setItem('todos', storage);
    } catch (err) {
        console.log(err);
    }
};