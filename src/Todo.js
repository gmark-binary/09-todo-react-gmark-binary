import './Todo.css';

function Todo() {
  return (
    <div id="todo-list">
    <div className="todo-container">
    <div className="checkbox-container">
        <label>Mark as complete?</label>
        <input type="checkbox"></input>
    </div>
    <div className="text-container">
        <span>Ouch?</span>
    </div>
    <div className="edit-container">
        <button type="button" className="edit-button">Edit</button>
    </div>
    <div className="delete-container">
        <button type="button" className="delete-button">Delete</button>
    </div>
</div>
</div>
  );
}

export default Todo;