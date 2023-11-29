import './Todo.css';
import React from 'react';
function Todo({ id, text, completed, onComplete, onDelete }) {
    return (
        <div className={`todo-container ${completed ? 'completed' : ''}`}>
          <div className="checkbox-container">
            <label htmlFor={`checkbox-${id}`}>Mark as complete?</label>
            <input
              id={`checkbox-${id}`}
              type="checkbox"
              checked={completed}
              onChange={() => onComplete(id, !completed)}
            />
          </div>
          <div className="text-container">
            <span>{text}</span>
          </div>
          <div className="edit-container">
            <button
              type="button"
              className="edit-button"
              onClick={() => console.log('Edit clicked')}
            >
              Edit
            </button>
          </div>
          <div className="delete-container">
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
    );
  }

export default Todo;