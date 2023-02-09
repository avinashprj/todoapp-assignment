import React, {
    useState,
    Fragment,
    SetStateAction,
    Dispatch,
    useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import useTodoStore, { ITodo } from "../../store/store";

interface ITodoModal {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    selectedTodo: ITodo | null;
}
export const TodoModal = ({ open, setOpen, selectedTodo }: ITodoModal) => {
    const { updateTodo } = useTodoStore();
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDesc, setTodoDesc] = useState("");
    useEffect(() => {
        if (selectedTodo !== null) {
            setTodoTitle(selectedTodo.title);
            setTodoDesc(selectedTodo.desc);
        }
    }, [selectedTodo]);

    const handleUpdate = () => {
        updateTodo(selectedTodo?.id as number, {
            ...(selectedTodo as ITodo),
            title: todoTitle,
            desc: todoDesc,
        });
        setOpen(false);
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 w-full">
                            <Dialog.Title className={"text-md mb-4"}>
                                Update Todo
                            </Dialog.Title>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="appearance-none border w-full rounded mb-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="item"
                                    name="item"
                                    placeholder="Title"
                                    value={todoTitle}
                                    onChange={(e) =>
                                        setTodoTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                    id="item"
                                    name="item"
                                    value={todoDesc}
                                    onChange={(e) =>
                                        setTodoDesc(e.target.value)
                                    }
                                    placeholder="Description"
                                />
                            </div>
                            <div className="flex">
                                <button
                                    onClick={handleUpdate}
                                    type="submit"
                                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded "
                                >
                                    Update Todo
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
