// src/tests/taskStore.test.js
import { describe, it, expect, vi } from 'vitest';
import { create } from 'zustand';
import { taskStore } from '../store/taskStore';

// Mock the mockApi
vi.mock('../services/mockApi', () => ({
  fetchTasks: vi.fn(() => Promise.resolve([{ id: '1', title: 'Test', columnId: 'todo' }])),
  fetchColumns: vi.fn(() => Promise.resolve([{ id: 'todo', title: 'To Do' }])),
  addTaskApi: vi.fn(() => Promise.resolve({ id: '2', title: 'New', columnId: 'todo' })),
  updateTaskApi: vi.fn(() => Promise.resolve({ id: '1', title: 'Updated' })),
  deleteTaskApi: vi.fn(() => Promise.resolve({ success: true })),
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

  // Add more tests as needed
});