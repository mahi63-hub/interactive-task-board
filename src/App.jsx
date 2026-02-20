import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useTaskStore } from './store/taskStore';
import Column from './components/Column';
import AddTaskForm from './components/AddTaskForm';
import EditTaskModal from './components/EditTaskModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const {
    tasks,
    columns,
    loading,
    error,
    fetchInitialData,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    persistState,
    loadPersistedState
  } = useTaskStore();

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadPersistedState();
    fetchInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    persistState();
  }, [tasks, columns]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddTask = async (columnId, title, description) => {
    try {
      await addTask(columnId, title, description);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async (taskId, updatedFields) => {
    try {
      await updateTask(taskId, updatedFields);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let destColumnId = over.id;
    let newPosition = 0;

    // Check if over is a task (for reordering)
    const overTask = tasks.find(t => t.id === over.id);
    if (overTask) {
      destColumnId = overTask.columnId;
      newPosition = tasks.filter(t => t.columnId === destColumnId).findIndex(t => t.id === over.id);
    } else {
      // Dropping on column
      newPosition = tasks.filter(t => t.columnId === destColumnId).length;
    }

    if (task.columnId !== destColumnId || overTask) {
      moveTask(taskId, task.columnId, destColumnId, newPosition);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      {error && <ErrorMessage message={error} />}
      <AddTaskForm onAdd={handleAddTask} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter(task => task.columnId === column.id)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </DndContext>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
