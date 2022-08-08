import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = (initialState = []) => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (newTodo) => {
        const action = {
            type: 'Add Todo',
            payload: newTodo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
    }


    const pendingTodosCount = todos.filter(todo => !todo.done).length

  return {
    todos, 
    handleNewTodo, 
    handleDeleteTodo, 
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount
  }
}
