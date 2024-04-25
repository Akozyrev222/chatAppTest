export interface TodoModel {
    id: number,
    todo: string,
    completed: boolean,
}

export interface TodoArrayModel {
    all_todos: TodoModel[]
}