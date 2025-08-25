import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import Confetti from 'react-confetti';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const addTodo = todo => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };

    const toggleComplete = id => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = id => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        ));
    };

    const editTask = (task, id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        ));
    };

    return (
        <div className='TodoWrapper'>
            {showConfetti && <Confetti />}
            <h1>To Do List</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo 
                        task={todo} 
                        key={index}
                        toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo}
                        editTodo={editTodo} 
                    />
                )
            ))}
        </div>
    );
};