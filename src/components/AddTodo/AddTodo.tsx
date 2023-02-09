import React, { FormEvent, useState } from "react";
import useTodoStore from "../../store/store";

export const AddTodo = () => {
    const { createTodo } = useTodoStore();
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDesc, setTodoDesc] = useState("");
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        createTodo({
            title: todoTitle,
            completed: false,
            date: new Date().toISOString(),
            desc: todoDesc,
        });
        setTodoTitle("");
        setTodoDesc("");
    };

    return (
        <div>
            <form
                onSubmit={onSubmitHandler}
                className="bg-gray-50 mt-6 px-6 pt-6 pb-8"
            >
                <label
                    htmlFor="item"
                    className="block text-gray-700 text-md font-bold mb-2"
                >
                    Add To-Do Item
                </label>

                <div className="flex flex-col sm:flex-row">
                    <input
                        type="text"
                        className="appearance-none border rounded sm:mr-2 mb-2 sm:mb-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="item"
                        name="item"
                        placeholder="Title"
                        value={todoTitle}
                        onChange={(e) => setTodoTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
                        id="item"
                        name="item"
                        value={todoDesc}
                        onChange={(e) => setTodoDesc(e.target.value)}
                        placeholder="Description"
                    />

                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 sm:ml-2 rounded"
                    >
                        Add Todo
                    </button>
                </div>
            </form>
        </div>
    );
};
