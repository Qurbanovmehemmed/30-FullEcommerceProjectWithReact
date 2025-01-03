import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, removeTodo, deleteAllTodos, toggleComplete } from '../redux/todosSlice'; 

function About() {
  const [newTodo, setNewTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const todos = useSelector(state => state.todos.todos); 
  const dispatch = useDispatch(); 

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo)); 
      setNewTodo('');
    }
  };

  const handleEditTodo = (id, text) => {
    setTodoToEdit({ id, text });
    setModalVisible(true);
  };

  const handleUpdateTodo = () => {
    if (todoToEdit.text.trim()) {
      dispatch(updateTodo({ id: todoToEdit.id, text: todoToEdit.text }));
      setModalVisible(false);
      setTodoToEdit(null);
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="start">
      <div className="App">
      <h1>Todo List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Yeni tapşırıq əlavə et"
      />
      <button onClick={handleAddTodo}>Əlavə et</button>

      <button onClick={handleDeleteAll}>Bütün Todoları Sil</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEditTodo(todo.id, todo.text)}>Redaktə et</button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Sil</button>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <div className="modal">
          <h2>Redaktə Et</h2>
          <input
            type="text"
            value={todoToEdit.text}
            onChange={(e) => setTodoToEdit({ ...todoToEdit, text: e.target.value })}
          />
          <button onClick={handleUpdateTodo}>Yadda Saxla</button>
          <button onClick={() => setModalVisible(false)}>Bağla</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default About;