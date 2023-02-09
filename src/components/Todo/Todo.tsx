import React, { Dispatch, SetStateAction, MouseEvent } from "react";
import { BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import useTodoStore, { ITodo } from "../../store/store";

interface TodoProps {
    todo: ITodo;
    dataId: number;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedTodo: Dispatch<SetStateAction<ITodo | null>>;
}
export const Todo = ({ todo, dataId, setOpen, setSelectedTodo }: TodoProps) => {
    const { updateTodo, removeTodo } = useTodoStore();
    const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        updateTodo(todo.id, {
            ...todo,
            completed: true,
        });
    };

    const handleClick = () => {
        setSelectedTodo(todo);
        setOpen(true);
    };
    return (
        <li
            onClick={handleClick}
            data-id={todo.id}
            className={`border border-t-1 border-grey-600 p-4 m-2 rounded-lg flex items-center justify-between hover:bg-slate-50 transition duration-200 ease-out hover:ease-in cursor-pointer h-[82px] ${
                todo.completed && "bg-green-100 hover:bg-green-200"
            }`}
        >
            <div className="flex flex-col">
                <span className="block mr-auto text-lg capitalize">
                    {todo?.title}
                </span>
                {todo?.desc && (
                    <span className="block mr-auto text-sm ml-4">
                        {todo.desc.slice(0, 50)}
                        {todo.desc.length >= 50 && "..."}
                    </span>
                )}
            </div>

            <div className="flex items-center">
                {!todo.completed && (
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-700 border border-green-500 hover:border-green-700 text-white rounded px-1  ml-auto ml-1 py-1 flex transition duration-200 ease-out hover:ease-in"
                    >
                        <BsCheck className="text-lg" />
                        <span className="sr-only">Mark as Completed</span>
                    </button>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeTodo(todo.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 border border-red-500 hover:border-red-700 text-white rounded px-1 py-1 ml-1 flex transition duration-200 ease-out hover:ease-in relative"
                >
                    <RxCross2 className="text-lg" />
                    <span className="sr-only">Remove Item</span>
                </button>
            </div>
        </li>
    );
};
