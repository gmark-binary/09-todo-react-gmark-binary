import './NewTodo.css';
import React, { useState } from 'react';
function NewTodo({ onAddTodo }) {
    const [newTodoText, setNewTodoText] = useState('');
    function handleSubmit(event) {
      event.preventDefault();
      onAddTodo(newTodoText);
      setNewTodoText('');
    }  
    return (
        <section id="new-todo">
          <h2>Create a new ToDo</h2>
          <form id="new-todo-form" onSubmit={handleSubmit}>
            <input
              id="new-todo-text"
              type="text"
              placeholder="What needs to be done?"
              autoFocus=""
            />
            <button id="new-todo-submit" type="submit">
              Create
            </button>
          </form>
        </section>
      );
    }
    

export default NewTodo;