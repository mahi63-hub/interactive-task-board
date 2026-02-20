// src/components/AddTaskForm.jsx
import React, { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState('todo');

  const handleSubmit = (e) => {
    // e.preventDefault();
    onAdd(columnId, title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="title" className="block">Task Title</label>
      <input
        id="title"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        // className="border p-2 mr-2"
      />
      <label htmlFor="description" className="block">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 mr-2"
      />
      <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;