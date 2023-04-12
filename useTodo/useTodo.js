import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const todosCount = todos.length;
    const pendingTodos = todos?.filter(todo => !todo.done).length;

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (todo) => {
        dispatch({
            type: "[TODO] Add Todo",
            payload: todo,
        });
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: "[TODO] Delete Todo",
            payload: id,
        });
    };

    const handleComplete = (id) => {
        // console.log(id);
        dispatch({
            type: "[TODO] Toggle Complete Todo",
            payload: id,
        });
    };



    return { todos, todosCount, pendingTodos, handleDeleteTodo, handleComplete, handleNewTodo };
};


