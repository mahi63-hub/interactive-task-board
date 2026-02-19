// src/components/AddTaskForm.jsx
import React, { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState('todo');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(columnId, title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 mr-2"
      />
      <select value={columnId} onChange={(e) => setColumnId(e.target.value)} className="border p-2 mr-2">
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
    </form>
  );
}

export default AddTaskForm;