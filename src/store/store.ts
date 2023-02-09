import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ITodo {
    id: number;
    title: string;
    desc: string;
    date: string;
    completed: boolean;
}
interface ITodoStore {
    todos: ITodo[] | [];
    createTodo: (newTodo: Pick<ITodo, Exclude<keyof ITodo, "id">>) => void;
    removeTodo: (newTodoId: number) => void;
    updateTodo: (todoId: number, todoChanges: ITodo) => void;
    clearTodos: () => void;
    setTodos: (newTodos: ITodo[]) => void;
}
const useTodoStore = create<ITodoStore>()(
    persist(
        (set) => ({
            todos: [],
            createTodo: (newTodo) => {
                set((state) => ({
                    todos: [
                        {
                            id: new Date().getTime(),
                            ...newTodo,
                        },
                        ...state.todos,
                    ],
                }));
            },
            setTodos(newTodos) {
                set((state) => ({
                    todos: newTodos,
                }));
            },
            removeTodo: (todoId) => {
                set((state) => ({
                    todos: state.todos.filter((item) => item.id !== todoId),
                }));
            },
            updateTodo: (todoId, todoChanges) => {
                set((state) => ({
                    todos: state.todos.map((item) =>
                        item.id === todoId
                            ? {
                                  ...item,
                                  ...todoChanges,
                              }
                            : item
                    ),
                }));
            },
            clearTodos: () => {
                set((state) => ({
                    todos: [],
                }));
            },
        }),
        {
            name: "todoStore",
        }
    )
);

export default useTodoStore;
