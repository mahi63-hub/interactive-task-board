// src/tests/taskStore.test.js
import { describe, it, expect, vi } from 'vitest';
import { create } from 'zustand';
import { taskStore } from '../store/taskStore';

// Mock the mockApi
vi.mock('../services/mockApi', () => ({
  fetchTasks: vi.fn(() => Promise.resolve([{ id: '1', title: 'Test', columnId: 'todo', position: 0 }])),
  fetchColumns: vi.fn(() => Promise.resolve([{ id: 'todo', title: 'To Do' }])),
  addTaskApi: vi.fn(() => Promise.resolve({ id: '2', title: 'New', columnId: 'todo', position: 1 })),
  updateTaskApi: vi.fn(() => Promise.resolve({ id: '1', title: 'Updated' })),
  deleteTaskApi: vi.fn(() => Promise.resolve({ success: true })),
  moveTaskApi: vi.fn(() => Promise.resolve({ success: true })),
}));

describe('taskStore', () => {
  it('should initialize with empty state', () => {
    const store = create(taskStore);
    const state = store.getState();
    expect(state.tasks).toEqual([]);
    expect(state.columns).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should add task optimistically on success', async () => {
    const store = create(taskStore);
    await store.getState().addTask('todo', 'New Task', 'Desc');
    const state = store.getState();
    expect(state.tasks.some(t => t.title === 'New Task')).toBe(true);
  });

  it('should rollback add task on failure', async () => {
    const { addTaskApi } = await import('../services/mockApi');
    vi.mocked(addTaskApi).mockRejectedValueOnce(new Error('API failed'));
    const store = create(taskStore);
    await expect(store.getState().addTask('todo', 'Fail Task', 'Desc')).rejects.toThrow('API failed');
    const state = store.getState();
    expect(state.tasks.some(t => t.title === 'Fail Task')).toBe(false);
    expect(state.error).toBe('API failed');
  });

  // Add more tests for update, delete, move
});