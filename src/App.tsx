import { useEffect, useState } from 'react';
import { useStore } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { Settings as SettingsIcon } from 'lucide-react';

function App() {
  const { fetchTasks, tasks, error } = useStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    // 每秒刷新任务列表以更新倒计时
    const interval = setInterval(() => {
      fetchTasks();
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            定时关机管理应用
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Task Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <TaskForm />
        </div>

        {/* Task List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            当前任务列表
          </h2>
          <TaskList tasks={tasks} />
        </div>
      </div>

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
