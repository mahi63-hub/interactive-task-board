// src/components/EditTaskModal.jsx
import React, { useState, useEffect } from 'react';

function EditTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task.id, { title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-title" className="block">Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 block mb-2"
          />
          <label htmlFor="edit-description" className="block">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 block mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mr-2">Save</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;