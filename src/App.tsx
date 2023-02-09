import { useEffect, useRef, useState, Fragment, useLayoutEffect } from "react";
import "./App.css";
import { Todo } from "./components/Todo/Todo";
import useTodoStore, { ITodo } from "./store/store";
import { AddTodo } from "./components/AddTodo/AddTodo";
import { TodoModal } from "./components/TodoModal/TodoModal";
import { ReactSortable } from "react-sortablejs";

function App() {
    const { todos, createTodo, updateTodo, removeTodo, clearTodos, setTodos } =
        useTodoStore();
    console.log(todos, "asf");
    const [open, setOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

    const pendingTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div className="App">
            <div className="todo w-full max-w-xs mx-auto mt-8 max-w-4xl p-4 ">
                <h1 className="text text-lg font-bold mb-4">To-Do app</h1>

                <div className="bg-white shadow-md rounded overflow-hidden min-h-[40rem]">
                    <AddTodo />
                    <div className="px-6 pt-6">
                        <div className="mb-6">
                            <h2 className="text-gray-700 text-md font-bold mb-2">
                                Pending
                            </h2>

                            <ReactSortable list={todos} setList={setTodos}>
                                {pendingTodos.map((todo) => {
                                    return (
                                        <Todo
                                            setSelectedTodo={setSelectedTodo}
                                            setOpen={setOpen}
                                            dataId={todo.id}
                                            key={todo.id}
                                            todo={todo}
                                        />
                                    );
                                })}
                            </ReactSortable>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-gray-700 text-md font-bold mb-2">
                                Completed
                            </h2>
                            <ReactSortable list={todos} setList={setTodos}>
                                {completedTodos.map((todo) => {
                                    return (
                                        <Todo
                                            setSelectedTodo={setSelectedTodo}
                                            setOpen={setOpen}
                                            dataId={todo.id}
                                            key={todo.id}
                                            todo={todo}
                                        />
                                    );
                                })}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
            </div>
            <TodoModal
                selectedTodo={selectedTodo}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}

export default App;
