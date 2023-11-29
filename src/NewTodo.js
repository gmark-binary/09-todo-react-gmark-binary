import './NewTodo.css';

function NewTodo() {
  return (
    <section id = "new-todo">
    <h2>Create a new ToDo</h2>
    <form id="new-todo-form">
        <input id="new-todo-text" type="text" placeholder="What needs to be done?" autofocus=""></input>
        <button id="new-todo-submit" type="submit">Create</button>
    </form>
    </section>
  );
}

export default NewTodo;