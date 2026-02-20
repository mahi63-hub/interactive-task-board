import React from 'react';

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 mb-2 rounded shadow">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="mt-2">
        <button onClick={() => onEdit(task)} className="mr-2 text-blue-500">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;