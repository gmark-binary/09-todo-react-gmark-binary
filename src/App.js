import './App.css';
import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [sortMethod, setSortMethod] = useState('default'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://cse204.work/todos", {
          headers: {
            "x-api-key": "7af2e8-ee1de7-46483c-46fee1-c47c67"
          }
        });
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  async function handleCompleteTodo(todoId, completed) {
    try {
      const response = await fetch(`https://cse204.work/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-api-key": "7af2e8-ee1de7-46483c-46fee1-c47c67"
        },
        body: JSON.stringify({ completed })
      });

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, completed } : todo
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodo(todoId) {
    try {
      const response = await fetch(`https://cse204.work/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          "x-api-key": "7af2e8-ee1de7-46483c-46fee1-c47c67"
        }
      });

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== todoId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddTodo(newTodoText) {
    try {
      const response = await fetch("https://cse204.work/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-api-key": "7af2e8-ee1de7-46483c-46fee1-c47c67"
        },
        body: JSON.stringify({ text: newTodoText })
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSort = (method) => {
    setSortMethod(method);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderSortedTodos = () => {
    let sortedTodos = [...todos];

    if (sortMethod === 'alphabetical') {
      sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortMethod === 'completion') {
      sortedTodos.sort((a, b) => a.completed - b.completed);
    }

    if (sortOrder === 'desc') {
      sortedTodos.reverse();
    }

    return sortedTodos.map((todo) => (
      <Todo
        key={todo.id}
        text={todo.text}
        onComplete={() => handleCompleteTodo(todo.id, !todo.completed)}
        onDelete={() => handleDeleteTodo(todo.id)}
        completed={todo.completed}
      />
    ));
  };

  return (
    <main>
      <NewTodo onAddTodo={handleAddTodo} />
      <div id="button-div">
      <button id="default-order" onClick={() => handleSort('default')} selected={sortMethod === 'default'}>
        Default Order {sortMethod === 'default' && `(${sortOrder.toUpperCase()})`}
      </button>
      <button id="alpha-order" onClick={() => handleSort('alphabetical')} selected={sortMethod === 'alphabetical'}>
        Sort Alphabetically {sortMethod === 'alphabetical' && `(${sortOrder.toUpperCase()})`}
      </button>
      <button id="comp-order" onClick={() => handleSort('completion')} selected={sortMethod === 'completion'}>
        Sort by Completion {sortMethod === 'completion' && `(${sortOrder.toUpperCase()})`}
      </button>
      </div>
      <div id="todo-list">{renderSortedTodos()}</div>
    </main>
  );
}

export default App;
