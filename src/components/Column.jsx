import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

function Column({ column, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-gray-100 p-4 rounded w-80">
      <h2 className="font-bold mb-4">{column.title}</h2>
      <div ref={setNodeRef}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default Column;