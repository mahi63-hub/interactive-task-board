// src/components/TaskCard.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 mb-2 rounded shadow"
    >
      <div {...attributes} {...listeners} className="cursor-pointer">
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="mt-2">
        <button data-no-dnd="true" aria-label={`Edit task: ${task.title}`} onClick={() => onEdit(task)} className="mr-2 text-blue-500">Edit</button>
        <button data-no-dnd="true" aria-label={`Delete task: ${task.title}`} onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;