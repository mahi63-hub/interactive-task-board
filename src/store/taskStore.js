import { create } from 'zustand';
import { fetchTasks, fetchColumns, addTaskApi, updateTaskApi, deleteTaskApi, moveTaskApi } from '../services/mockApi';
import { v4 as uuidv4 } from 'uuid';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  columns: [],
  loading: false,
  error: null,

  fetchInitialData: async () => {
    set({ loading: true, error: null });
    try {
      const [tasksData, columnsData] = await Promise.all([fetchTasks(), fetchColumns()]);
      set({ tasks: tasksData, columns: columnsData, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTask: async (columnId, title, description) => {
    const tempId = 'temp-' + uuidv4();
    const newTask = { id: tempId, columnId, title, description };

    // Optimistic Update
    set(state => ({ tasks: [...state.tasks, newTask] }));

    try {
      const savedTask = await addTaskApi(newTask); // Simulate API call
      set(state => ({ tasks: state.tasks.map(t => t.id === tempId ? savedTask : t) }));
    } catch (err) {
      // Rollback on failure
      set(state => ({ tasks: state.tasks.filter(t => t.id !== tempId), error: err.message }));
      throw err; // Re-throw to inform UI component
    }
  },

  updateTask: async (taskId, updatedFields) => {
    const originalTasks = get().tasks;
    const originalTask = originalTasks.find(t => t.id === taskId);
    const updatedTask = { ...originalTask, ...updatedFields };

    // Optimistic Update
    set(state => ({ tasks: state.tasks.map(t => t.id === taskId ? updatedTask : t) }));

    try {
      await updateTaskApi(updatedTask); // Simulate API call
    } catch (err) {
      // Rollback on failure
      set({ tasks: originalTasks, error: err.message });
      throw err;
    }
  },

  deleteTask: async (taskId) => {
    const originalTasks = get().tasks;

    // Optimistic Update
    set(state => ({ tasks: state.tasks.filter(t => t.id !== taskId) }));

    try {
      await deleteTaskApi(taskId); // Simulate API call
    } catch (err) {
      // Rollback on failure
      set({ tasks: originalTasks, error: err.message });
      throw err;
    }
  },

  moveTask: async (taskId, sourceColumnId, destColumnId, newPosition) => {
    const originalTasks = get().tasks;
    const taskIndex = originalTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const newTasks = [...originalTasks];
    const [movedTask] = newTasks.splice(taskIndex, 1);
    movedTask.columnId = destColumnId;
    newTasks.splice(newPosition, 0, movedTask);

    set({ tasks: newTasks });

    try {
      await moveTaskApi(taskId, destColumnId, newPosition);
    } catch (err) {
      set({ tasks: originalTasks, error: err.message });
      throw err;
    }
  },

  persistState: () => {
    const { tasks, columns } = get();
    localStorage.setItem('taskBoardState', JSON.stringify({ tasks, columns }));
  },

  loadPersistedState: () => {
    const persistedState = localStorage.getItem('taskBoardState');
    if (persistedState) {
      set(JSON.parse(persistedState));
    }
  }
}));