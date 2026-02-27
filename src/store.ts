import { create } from 'zustand';
import { Task } from './types';
import { invoke } from '@tauri-apps/api/core';

interface AppStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (action: string, executeAt: number) => Promise<void>;
  cancelTask: (taskId: string) => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const tasks = await invoke<Task[]>('get_tasks');
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },

  createTask: async (action: string, executeAt: number) => {
    try {
      set({ error: null });
      await invoke<string>('create_task', { action, executeAt });
      await get().fetchTasks();
    } catch (error) {
      set({ error: String(error) });
      throw error;
    }
  },

  cancelTask: async (taskId: string) => {
    try {
      set({ error: null });
      await invoke('cancel_task', { taskId });
      await get().fetchTasks();
    } catch (error) {
      set({ error: String(error) });
      throw error;
    }
  },
}));
